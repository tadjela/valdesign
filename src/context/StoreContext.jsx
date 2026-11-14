import { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';
import { COUNTRIES } from '../utils/currency';

const Ctx = createContext();
export const useStore = () => useContext(Ctx);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const keyOf = (i) => `${i.id}|${i.size}|${i.color}`;

export function StoreProvider({ children }) {
  const [country, setCountry] = useState(() => load('vd-country', 'EG'));
  const [cart, setCart] = useState(() => load('vd-cart', []));
  const [bump, setBump] = useState(0);
  useEffect(() => { try { localStorage.setItem('vd-country', JSON.stringify(country)); } catch {} }, [country]);
  useEffect(() => { try { localStorage.setItem('vd-cart', JSON.stringify(cart)); } catch {} }, [cart]);

  const { cur, field } = COUNTRIES[country] || COUNTRIES.EG;
  const price = (p) => p[field];
  const lines = cart
    .map((i) => { const p = products.find((x) => x.id === i.id); return p && { ...i, key: keyOf(i), name: p.name, price: p[field], p }; })
    .filter(Boolean);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  const add = (item) => {
    setCart((c) => c.some((x) => keyOf(x) === keyOf(item))
      ? c.map((x) => (keyOf(x) === keyOf(item) ? { ...x, qty: x.qty + item.qty } : x))
      : [...c, item]);
    setBump((b) => b + 1);
  };
  const setQty = (k, q) => setCart((c) => c.map((x) => (keyOf(x) === k ? { ...x, qty: Math.max(1, q) } : x)));
  const remove = (k) => setCart((c) => c.filter((x) => keyOf(x) !== k));

  return <Ctx.Provider value={{ country, setCountry, cur, price, lines, total, count, bump, add, setQty, remove }}>{children}</Ctx.Provider>;
}
