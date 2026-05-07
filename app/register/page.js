"use client";

import { useState } from "react";
import "./register.css";

export default function Register() {
    const [form, setform] = useState({
        name: "",
        email: "",
        password: "",
        role: "attendee",
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();
        alert(data.message || data.error);
    }

    return (
        <main className="register-page">
  <form onSubmit={handleSubmit} className="register-card">
    <h1>Register</h1>

    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={form.name}
        onChange={(e) => setform({ ...form, name: e.target.value })}
      />
    </div>

    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={form.email}
        onChange={(e) => setform({ ...form, email: e.target.value })}
      />
    </div>

    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={form.password}
        onChange={(e) => setform({ ...form, password: e.target.value })}
      />
    </div>

    <div>
      <label htmlFor="role">Role:</label>
      <select
        id="role"
        value={form.role}
        onChange={(e) => setform({ ...form, role: e.target.value })}
      >
        <option value="attendee">Attendee</option>
        <option value="organiser">Organiser</option>
      </select>
    </div>

    <button type="submit">Register</button>

    <a href="/">Home Page</a>
  </form>
</main>
    );
}