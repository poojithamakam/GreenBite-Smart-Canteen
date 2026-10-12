import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import FoodCard from '../components/FoodCard.jsx';
import { categories as fallbackCategories, menuItems as fallbackItems } from '../data/menu.js';
import api from '../api/client.js';

export default function Menu() {
  const [search, setSearch] = useState('');
  const [allItems, setAllItems] = useState(fallbackItems);
  const [categories, setCategories] = useState(fallbackCategories);
  const [apiNotice, setApiNotice] = useState('');
  useEffect(() => { Promise.all([api.get('/food-items'), api.get('/categories')]).then(([foods, cats]) => { setAllItems(foods.data.map((f, i) => ({...f, category: f.category?.name || 'Other', rating: 4.5, tag: i < 3 ? 'Popular' : 'Fresh', image: f.imageUrl || 'https://placehold.co/600x400/f0f4ee/176b52?text=GreenBite' }))); setCategories(['All', ...cats.data.map(c => c.name)]); setApiNotice(''); }).catch(() => setApiNotice('Showing sample menu because the backend API is not reachable.')); }, []);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('recommended');

  const filtered = useMemo(() => {
    const result = allItems.filter(item =>
      (category === 'All' || item.category === category) &&
      `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [allItems, search, category, sort]);

  return (
    <main className="container page-space">
      <div className="menu-intro"><span className="eyebrow">THE CANTEEN MENU</span><h1>Find your <span>happy plate.</span></h1><p>Freshly made favourites, ready when you are.</p></div>
      <div className="menu-toolbar">
        <div className="search-box"><Search size={19} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dishes..." aria-label="Search dishes" />{search && <button onClick={() => setSearch('')} aria-label="Clear search">×</button>}</div>
        <label className="sort-box"><SlidersHorizontal size={17} /><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort menu"><option value="recommended">Recommended</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </div>
      {apiNotice && <div className="alert alert-warning py-2">{apiNotice}</div>}
      <div className="category-row">{categories.map(item => <button key={item} className={`category-pill ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="results-line"><span>{filtered.length} items to make you smile</span><span>Prices in INR · Pickup only</span></div>
      {filtered.length ? <div className="food-grid">{filtered.map(food => <FoodCard key={food.id} food={food} />)}</div> : <div className="empty-state"><span>🥗</span><h3>No dishes found</h3><p>Try another search or category.</p><button className="btn btn-brand" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</button></div>}
    </main>
  );
}
