import { db } from "@/lib/db";

export async function GET() {
  try {
    const connection = await db();

    const [rows] = await connection.query("SELECT * FROM users");

    return Response.json(rows);
  } catch (error) {
    return Response.json({
      error: error.message,
    });
  }
}