import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const { rows } = await sql`SELECT * from operators`;
    return rows && Math.random() > 0.5
      ? NextResponse.json(
          { data: rows },
          {
            status: 200,
          }
        )
      : NextResponse.json(
          {
            error: "Не удалось получить данные",
          },
          {
            status: 400,
          }
        );
  } catch (error) {
    console.log("Ошибка при подключении базы данных - ", error);
  }
}

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { name } = await request.json();

  try {
    if (Math.random() > 0.5) {
      await sql`INSERT INTO operators (name) VALUES (${name});`;
      return NextResponse.json(
        { data: { name, message: "Оператор добавлен" } },
        {
          status: 200,
        }
      );
    } else {
      throw "Не удалось добавить оператора";
    }
  } catch (error) {
    return NextResponse.json(
      { name, error },
      {
        status: 400,
      }
    );
  }
}
