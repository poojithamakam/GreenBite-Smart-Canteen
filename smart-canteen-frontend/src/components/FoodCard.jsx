import React from 'react';
import { Plus, Star, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function FoodCard({ food }) {
  const { addItem, items } = useCart();
  const quantity = items.find(item => item.id === food.id)?.quantity || 0;

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img src={food.image} alt={food.name} className="food-image" loading="lazy"
          onError={(event) => { event.currentTarget.src = 'https://placehold.co/600x400/f0f4ee/176b52?text=GreenBite'; }} />
        <span className="food-tag">{food.tag}</span>
      </div>
      <div className="food-content">
        <div className="d-flex align-items-start justify-content-between gap-2">
          <h3>{food.name}</h3><span className="veg-mark"><Leaf size={12} /></span>
        </div>
        <div className="food-meta"><span><Star size={14} fill="currentColor" /> {food.rating}</span><span>{food.category}</span></div>
        <p>{food.description}</p>
        <div className="food-card-bottom">
          <strong>₹{food.price}</strong>
          <button className={`add-button ${quantity ? 'added' : ''}`} onClick={() => addItem(food)}>
            {quantity ? `${quantity} added` : 'ADD'} <Plus size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}