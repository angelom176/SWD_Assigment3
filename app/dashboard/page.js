import "./dashboard.css";

export default function DashboardPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Welcome to the Conference Management System.</p>

        <div className="dashboard-actions">
          <a href="/events">View Events</a>
          <a href="/events/create">Create Event</a>
          <a href="/bookings">My Bookings</a>
          <a href="/admin">Admin Panel</a>
          <a href="/">Home</a>
        </div>
      </section>
    </main>
  );
}