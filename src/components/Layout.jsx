import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="brand">HotelHub</Link>
        <Link to="/add" className="btn btn-primary">+ Add Hotel</Link>
      </header>
      <main className="container">{children}</main>
    </div>
  )
}