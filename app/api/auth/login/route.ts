import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { normalizeEmail } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(body.email);
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Введите email и пароль." }, { status: 400 });
    }

    const result = await db.query(
      "SELECT id, username, email, password_hash, created_at FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
      [email]
    );

    if (!result.rowCount) {
      return NextResponse.json({ error: "Неверный email или пароль." }, { status: 401 });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return NextResponse.json({ error: "Неверный email или пароль." }, { status: 401 });
    }

    await createSession(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return NextResponse.json({ error: "Ошибка сервера. Проверьте подключение к базе данных." }, { status: 500 });
  }
}
