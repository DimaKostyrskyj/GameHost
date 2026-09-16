import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { nodeRequest } from "@/lib/nodeAgent";
const games = new Set(["Valheim", "Minecraft", "Terraria", "Rust", "CS2", "Palworld"]);
export async function GET() { const userId=await getSessionUserId(); if(!userId)return NextResponse.json({error:"Не авторизован"},{status:401}); try{const r=await db.query(`SELECT id,name,game,status,region,ram_mb,cpu_cores,disk_gb,port,created_at,updated_at FROM game_servers WHERE user_id=$1 ORDER BY created_at DESC`,[userId]); return NextResponse.json({servers:r.rows});}catch(e){console.error("SERVERS_GET_ERROR",e);return NextResponse.json({error:"Ошибка базы данных"},{status:500});}}
export async function POST(req:Request){const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:"Не авторизован"},{status:401});try{const b=await req.json();const name=String(b.name||"").trim().slice(0,64),game=String(b.game||"").trim(),ram=Number(b.ram_mb??2048),cpu=Number(b.cpu_cores??2),disk=Number(b.disk_gb??20),region=String(b.region||"eu-central").trim().slice(0,32);if(name.length<2)return NextResponse.json({error:"Название сервера слишком короткое"},{status:400});if(!games.has(game))return NextResponse.json({error:"Эта игра пока не поддерживается"},{status:400});if(![1024,2048,4096,8192,16384].includes(ram)||![1,2,4,6,8].includes(cpu)||![10,20,40,80,160].includes(disk))return NextResponse.json({error:"Недопустимые ресурсы сервера"},{status:400});const r=await db.query(`INSERT INTO game_servers(user_id,name,game,status,region,ram_mb,cpu_cores,disk_gb) VALUES($1,$2,$3,'provisioning',$4,$5,$6,$7) RETURNING id,name,game,status,region,ram_mb,cpu_cores,disk_gb,port,created_at,updated_at`,[userId,name,game,region,ram,cpu,disk]);const server=r.rows[0];
    if (process.env.NODE_AGENT_URL) {
      try {
        const node=await nodeRequest("/servers", {id:server.id,game:server.game,name:server.name,ram_mb:server.ram_mb,cpu_cores:server.cpu_cores,disk_gb:server.disk_gb});
        if (node.data?.container_id) {
          await db.query(`UPDATE game_servers SET status='stopped', container_id=$1, port=$2, updated_at=NOW() WHERE id=$3`, [node.data.container_id, node.data.host_port ?? null, server.id]);
          server.status="stopped"; server.container_id=node.data.container_id; server.port=node.data.host_port ?? null;
        }
      } catch (nodeError) {
        console.error("NODE_PROVISION_ERROR", nodeError);
        await db.query(`UPDATE game_servers SET status='error', updated_at=NOW() WHERE id=$1`, [server.id]);
        server.status="error";
      }
    }
    return NextResponse.json({server, nodeConnected:Boolean(process.env.NODE_AGENT_URL)}, {status:201});}catch(e){console.error("SERVERS_POST_ERROR",e);return NextResponse.json({error:"Не удалось создать сервер"},{status:500});}}
