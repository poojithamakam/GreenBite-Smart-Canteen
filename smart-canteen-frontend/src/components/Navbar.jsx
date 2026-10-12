import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Utensils, UserRound, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container py-3">
        <Link className="brand" to="/">
          <span className="brand-mark"><Utensils size={22} /></span>
          <span>greenbite<span className="brand-dot">.</span><small>SMART CANTEEN</small></span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/menu">Menu</NavLink>
            {user?.role === 'STUDENT' && <NavLink className="nav-link" to="/orders">My orders</NavLink>}
            {user?.role === 'ADMIN' && <NavLink className="nav-link" to="/admin"><LayoutDashboard size={16} className="me-1" />Dashboard</NavLink>}
            <NavLink className="nav-link cart-nav" to="/cart"><ShoppingBag size={18} /> Cart <span className="cart-count">{count}</span></NavLink>
            {!user ? <Link className="btn btn-brand btn-sm px-4" to="/login">Sign in</Link> : (
              <div className="d-flex align-items-center gap-2 ms-lg-2">
                <span className="user-chip"><UserRound size={16} /> {user.name.split(' ')[0]}</span>
                <button className="icon-button" onClick={handleLogout} title="Sign out" aria-label="Sign out"><LogOut size={17} /></button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}