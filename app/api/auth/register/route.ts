import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { normalizeEmail, normalizeUsername, validEmail, validUsername } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = normalizeUsername(body.username);
    const email = normalizeEmail(body.email);
    const password = String(body.password ?? "");

    if (!validUsername(username)) {
      return NextResponse.json({ error: "Имя пользователя: 3–32 символа, только латинские буквы, цифры, _ и -." }, { status: 400 });
    }
    if (!validEmail(email)) {
      return NextResponse.json({ error: "Введите корректный email." }, { status: 400 });
    }
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: "Пароль должен содержать от 8 до 128 символов." }, { status: 400 });
    }

    const existing = await db.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($2) LIMIT 1",
      [email, username]
    );

    if (existing.rowCount) {
      return NextResponse.json({ error: "Пользователь с таким email или именем уже существует." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, passwordHash]
    );

    const user = result.rows[0];
    await createSession(user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    return NextResponse.json({ error: "Ошибка сервера. Проверьте подключение к базе данных." }, { status: 500 });
  }
}
