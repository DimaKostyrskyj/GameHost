import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";

export async function GET() {
  const userId = await getSessionUserId();

  if (!userId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const result = await db.query(
    "SELECT id, username, email, created_at FROM users WHERE id = $1 LIMIT 1",
    [userId]
  );

  if (!result.rowCount) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: result.rows[0] });
}
