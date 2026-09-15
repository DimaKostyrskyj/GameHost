import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { normalizeEmail, normalizeUsername, validEmail, validUsername } from "@/lib/validation";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  try {
    const result = await db.query(
      `SELECT id, username, email, created_at, updated_at FROM users WHERE id = $1 LIMIT 1`,
      [userId]
    );
    if (!result.rows[0]) return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    return NextResponse.json({ user: result.rows[0] });
  } catch (error) {
    console.error("PROFILE_GET_ERROR", error);
    return NextResponse.json({ error: "Ошибка базы данных" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  try {
    const body = await request.json();
    const username = normalizeUsername(body.username);
    const email = normalizeEmail(body.email);

    if (!validUsername(username)) {
      return NextResponse.json({ error: "Имя пользователя: 3–32 символа, только латиница, цифры, _ и -" }, { status: 400 });
    }
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });
    }

    const duplicate = await db.query(
      `SELECT id FROM users WHERE (LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)) AND id <> $3 LIMIT 1`,
      [username, email, userId]
    );
    if (duplicate.rows[0]) {
      return NextResponse.json({ error: "Такое имя пользователя или email уже заняты" }, { status: 409 });
    }

    const result = await db.query(
      `UPDATE users SET username = $1, email = $2, updated_at = NOW() WHERE id = $3
       RETURNING id, username, email, created_at, updated_at`,
      [username, email, userId]
    );

    return NextResponse.json({ user: result.rows[0] });
  } catch (error: any) {
    console.error("PROFILE_PATCH_ERROR", error);
    if (error?.code === "23505") {
      return NextResponse.json({ error: "Такое имя пользователя или email уже заняты" }, { status: 409 });
    }
    return NextResponse.json({ error: "Ошибка базы данных" }, { status: 500 });
  }
}
