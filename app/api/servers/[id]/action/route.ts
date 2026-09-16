import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { nodeRequest } from "@/lib/nodeAgent";
const transitions:Record<string,{from:string[];to:string}>={start:{from:["stopped","error"],to:"running"},stop:{from:["running","restarting","error"],to:"stopped"},restart:{from:["running","stopped"],to:"restarting"}};
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){const uid=await getSessionUserId();if(!uid)return NextResponse.json({error:"Не авторизован"},{status:401});const {id}=await params;try{const b=await req.json(),action=String(b.action||""),t=transitions[action];if(!t)return NextResponse.json({error:"Неизвестное действие"},{status:400});const c=await db.query(`SELECT status FROM game_servers WHERE id=$1 AND user_id=$2 LIMIT 1`,[id,uid]);if(!c.rows[0])return NextResponse.json({error:"Сервер не найден"},{status:404});if(!t.from.includes(c.rows[0].status))return NextResponse.json({error:`Нельзя выполнить действие из состояния ${c.rows[0].status}`},{status:409});if(process.env.NODE_AGENT_URL){
      try{ await nodeRequest(`/servers/${id}/${action}`); }
      catch(e){ console.error("NODE_ACTION_ERROR",e); return NextResponse.json({error:"Нода не выполнила команду"},{status:502}); }
    }
    const r=await db.query(`UPDATE game_servers SET status=$1,updated_at=NOW() WHERE id=$2 AND user_id=$3 RETURNING *`,[t.to,id,uid]);
    return NextResponse.json({server:r.rows[0],nodeConnected:Boolean(process.env.NODE_AGENT_URL)});}catch(e){console.error(e);return NextResponse.json({error:"Ошибка управления сервером"},{status:500});}}
