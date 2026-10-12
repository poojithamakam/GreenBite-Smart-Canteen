import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Cart() {
  const { items, setQuantity, removeItem, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <main className="container page-space">
      <div className="page-title-row"><div><span className="eyebrow">YOUR ORDER</span><h1>Shopping cart</h1><p>Review your picks before checkout.</p></div><Link className="text-link" to="/menu"><ArrowLeft size={17} /> Continue shopping</Link></div>
      {!items.length ? <div className="empty-state cart-empty"><ShoppingBag size={44} /><h3>Your cart is feeling lonely</h3><p>Add a few canteen favourites and they'll show up here.</p><Link to="/menu" className="btn btn-brand">Browse menu</Link></div> : (
        <div className="cart-layout">
          <section className="cart-items-panel">
            {items.map(item => <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} onError={e => { e.currentTarget.src = 'https://placehold.co/160x120/f0f4ee/176b52?text=Food'; }} />
              <div className="cart-item-info"><h3>{item.name}</h3><span>{item.category}</span><strong>₹{item.price}</strong></div>
              <div className="cart-item-actions"><div className="quantity-control"><button onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}><Minus size={14}/></button><span>{item.quantity}</span><button onClick={() => setQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name}`}><Plus size={14}/></button></div><button className="remove-button" onClick={() => removeItem(item.id)}><Trash2 size={15}/> Remove</button></div>
              <strong className="line-total">₹{item.price * item.quantity}</strong>
            </article>)}
          </section>
          <aside className="summary-card"><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="summary-line"><span>Pickup</span><span className="free-label">Free</span></div><div className="summary-line total-line"><strong>Total</strong><strong>₹{subtotal}</strong></div><p className="pickup-note">📍 Collect your order at the canteen counter. No delivery charges.</p><button className="btn btn-brand w-100 btn-lg" onClick={() => user ? navigate('/checkout') : navigate('/login?next=/checkout')}>Proceed to checkout</button><small className="secure-note">Secure checkout · Prices shown in INR</small></aside>
        </div>
      )}
    </main>
  );
}
