"use client";

import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = "/dashboard";
    } else {
      alert(data.error);
    }
  }

  return (
    <main className="login-page">
      <form onSubmit={handleSubmit} className="login-card">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>

        <a href="/register">Create account</a>
        <a href="/">Back to Home</a>
      </form>
    </main>
  );
}