import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { rows } = await sql`SELECT * FROM operators WHERE id = ${params.id};`;

  return rows && Math.random() > 0.5
    ? NextResponse.json(
        {
          data: {
            operator: rows[0],
          },
        },
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
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { rows } = await sql`SELECT * FROM operators WHERE id = ${params.id};`;

  if (rows[0]) {
    const { phone, amount } = await request.json();

    return phone && amount && Math.random() > 0.5
      ? NextResponse.json(
          {
            data: {
              operator: rows[0],
              phone,
              amount,
              message: "Оплата прошла успешно",
            },
          },
          {
            status: 200,
          }
        )
      : NextResponse.json(
          {
            phone,
            amount,
            error: "Не удалось оплатить",
          },
          {
            status: 400,
          }
        );
  } else {
    return NextResponse.json(
      { error: "Оператора не существует" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    if (Math.random() > 0.5) {
      await sql`DELETE FROM operators WHERE id = ${params.id};`;
      return NextResponse.json(
        { data: { message: "Оператор удален" } },
        {
          status: 200,
        }
      );
    } else {
      throw "Не удалось удалить оператора";
    }
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 400,
      }
    );
  }
}
