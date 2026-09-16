import express from "express";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";

const exec = promisify(execFile);
const app = express();
app.use(express.json({ limit: "256kb" }));
const PORT = Number(process.env.PORT || 8787);
const TOKEN = process.env.NODE_AGENT_TOKEN;
const ROOT = process.env.GAMEHOST_DATA_DIR || "/opt/gamehost/servers";

const templates = {
  Valheim: { image: "lloesche/valheim-server:latest", mounts: [{target:"/config",dir:"config"},{target:"/opt/valheim",dir:"data"}], ports: [{container:2456, protocol:"udp"},{container:2457,protocol:"udp"}], env: {SERVER_PUBLIC:"true",WORLD_NAME:"Dedicated"} },
  Minecraft: { image: "itzg/minecraft-server:latest", mounts: [{target:"/data",dir:"data"}], ports: [{container:25565,protocol:"tcp"}], env: {EULA:"TRUE",TYPE:"VANILLA"} },
  Rust: { image: "didstopia/rust-server:latest", mounts: [{target:"/steamcmd/rust",dir:"data"}], ports: [{container:28015,protocol:"udp"}], env: {} }
};

function auth(req,res,next){
  if(!TOKEN || req.header("authorization") !== `Bearer ${TOKEN}`) return res.status(401).json({error:"Unauthorized"});
  next();
}
function safe(id){ return String(id).replace(/[^a-zA-Z0-9_-]/g, ""); }
async function docker(args){ return exec("docker", args, {maxBuffer: 1024*1024*4}); }
async function existsContainer(name){ try { await docker(["inspect",name]); return true; } catch { return false; } }

app.get("/health", (_req,res)=>res.json({ok:true, node:process.env.NODE_NAME||"gamehost-node"}));
app.use(auth);

app.post("/servers", async (req,res)=>{
  try{
    const {id,game,name,ram_mb,cpu_cores,disk_gb}=req.body;
    const t=templates[game]; if(!t) return res.status(400).json({error:"Unsupported game"});
    const sid=safe(id), cname=`gamehost-${sid}`;
    await fs.mkdir(path.join(ROOT,sid,"data"),{recursive:true});
    if(await existsContainer(cname)) return res.json({ok:true,container_id:cname});
    const args=["create","--name",cname,"--memory",`${Number(ram_mb)||2048}m`,`--cpus`,String(Number(cpu_cores)||2),"--restart","unless-stopped"];
    const hostPort=Number(req.body.port)||t.ports[0].container;
    for(const [index,p] of t.ports.entries()){ args.push("-p",`${hostPort+index}:${p.container}/${p.protocol}`); }
    for(const [k,v] of Object.entries(t.env)) args.push("-e",`${k}=${v}`);
    for(const m of t.mounts){ args.push("-v",`${path.join(ROOT,sid,m.dir)}:${m.target}`); }
    args.push(t.image);
    const out=await docker(args);
    res.status(201).json({ok:true,container_id:cname,host_port:hostPort,output:out.stdout});
  }catch(e){console.error(e);res.status(500).json({error:e.message});}
});

for(const action of ["start","stop","restart"]){
  app.post(`/servers/:id/${action}`,async(req,res)=>{try{const name=`gamehost-${safe(req.params.id)}`;const out=await docker([action,name]);res.json({ok:true,output:out.stdout});}catch(e){res.status(500).json({error:e.message});}});
}
app.get("/servers/:id/stats",async(req,res)=>{try{const name=`gamehost-${safe(req.params.id)}`;const {stdout}=await docker(["stats",name,"--no-stream","--format","{{json .}}"]);res.json({ok:true,stats:stdout.trim()});}catch(e){res.status(404).json({error:e.message});}});
app.get("/servers/:id/logs",async(req,res)=>{try{const name=`gamehost-${safe(req.params.id)}`;const {stdout}=await docker(["logs","--tail","150",name]);res.json({ok:true,logs:stdout});}catch(e){res.status(404).json({error:e.message});}});

app.listen(PORT,()=>console.log(`GameHost node agent listening on :${PORT}`));
