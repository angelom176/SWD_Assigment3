import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { name, email, password, role } = await request.json();

        if(!name || !email || !password || !role) {
            return Response.json({error: "All fields are required"}, {status: 400});
        }

        if(!["attendee", "organiser"].includes(role)) {
            return Response.json({error: "Invalid role"}, {status: 400});
        }

        const connection = await db();

        const [existingUser] = await connection.query("SELECT id FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return Response.json({ error: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );

        return Response.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        return Response.json({error: error.message}, {status: 500});
    }
}