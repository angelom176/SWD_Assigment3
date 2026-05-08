import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return Response.json({error: "Email and password are required"}, {status: 400});
        }

        const connection = await db();

        const [users] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const cookieStore = await cookies();

        cookieStore.set("userId", String(user.id), {
            httpOnly: true,
            path: "/",
        });

        cookieStore.set("role", user.role, {
            httpOnly: true,
            path: "/",
        });

        return Response.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        return Response.json({error: error.message}, {status: 500});
    
    }
}