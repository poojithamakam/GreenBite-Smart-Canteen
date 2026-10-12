import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { ArrowUpRight, Heart, Utensils } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import Admin from './pages/Admin.jsx';
import { Login, Register } from './pages/Auth.jsx';

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Link className="brand footer-brand" to="/"><span className="brand-mark"><Utensils size={20}/></span><span>greenbite<span className="brand-dot">.</span><small>SMART CANTEEN</small></span></Link><p>Made for campus breaks, one delicious bite at a time.</p><span className="footer-love">Made with <Heart size={14} fill="currentColor"/> for campus life</span></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} GreenBite. Student project prototype.</span><span>Pickup only · No delivery service</span><a href="#top" aria-label="Back to top">Back to top <ArrowUpRight size={14}/></a></div></footer>;
}

export function App() {
  return <div id="top" className="app-shell"><Navbar/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/menu" element={<Menu/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route element={<ProtectedRoute role="STUDENT"/>}><Route path="/checkout" element={<Checkout/>}/><Route path="/orders" element={<Orders/>}/></Route>
    <Route element={<ProtectedRoute role="ADMIN"/>}><Route path="/admin" element={<Admin/>}/></Route>
    <Route path="*" element={<main className="container page-space empty-state"><h1>Page not found</h1><Link className="btn btn-brand" to="/">Return home</Link></main>}/>
  </Routes><Footer/></div>;
}