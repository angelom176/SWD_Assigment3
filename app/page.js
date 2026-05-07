import "./home.css";

export default function Home() {
  return (
    <main className="home-page">
      <div className="home-card">
        <h1>Conference Management System</h1>

        <div className="home-buttons">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/events">Events</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/admin">Admin Panel</a>
        </div>
      </div>
    </main>
  );
}