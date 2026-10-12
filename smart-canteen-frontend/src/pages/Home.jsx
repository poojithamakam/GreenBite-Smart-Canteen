import React from 'react';
import { ArrowRight, Clock3, ShieldCheck, Sparkles, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard.jsx';
import { menuItems } from '../data/menu.js';

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> YOUR CAMPUS, YOUR CRAVINGS</span>
            <h1>Good food.<br /><span>Zero queue.</span></h1>
            <p>Your campus favourites are just a few clicks away. Order ahead, skip the line, and pick up fresh food at the canteen counter.</p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/menu" className="btn btn-brand btn-lg">Explore menu <ArrowRight size={18} /></Link>
              <a href="#how-it-works" className="btn btn-outline-brand btn-lg">How it works</a>
            </div>
            <div className="hero-trust"><span><Clock3 size={17} /> Quick pickup</span><span><ShieldCheck size={17} /> Secure checkout</span></div>
          </div>
          <div className="hero-art">
            <div className="hero-photo"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90" alt="Freshly prepared food bowl" /></div>
            <div className="floating-note"><span className="note-icon">✓</span><span><b>Freshly prepared</b><small>Made at your campus canteen</small></span></div>
            <div className="hero-sticker">Fresh<br />& tasty!</div>
          </div>
        </div>
      </section>

      <section className="container section-space">
        <div className="section-heading"><div><span className="eyebrow">MADE FOR YOUR BREAK</span><h2>Campus favourites</h2><p>Something delicious for every kind of day.</p></div><Link className="text-link" to="/menu">View full menu <ArrowRight size={17} /></Link></div>
        <div className="food-grid">{menuItems.slice(0, 4).map(food => <FoodCard key={food.id} food={food} />)}</div>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="container section-space">
          <div className="section-heading centered"><div><span className="eyebrow">THREE SIMPLE STEPS</span><h2>Your food, on your time</h2><p>More time for what matters between classes.</p></div></div>
          <div className="steps-grid">
            <div className="step-card"><span className="step-number">01</span><div className="step-icon"><Utensils /></div><h3>Choose your food</h3><p>Explore the menu and add your favourites to the cart.</p></div>
            <div className="step-card"><span className="step-number">02</span><div className="step-icon">₹</div><h3>Place your order</h3><p>Review your order and complete checkout securely.</p></div>
            <div className="step-card"><span className="step-number">03</span><div className="step-icon">✓</div><h3>Pick it up</h3><p>Check your order status and collect it at the canteen counter.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}