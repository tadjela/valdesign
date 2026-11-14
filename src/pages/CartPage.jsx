import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pic } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { COUNTRIES, fmt } from '../utils/currency';
import { orderLink } from '../utils/whatsapp';

export default function CartPage() {
  const { lines, total, cur, country, setQty, remove } = useStore();
  const [name, setName] = useState('');
  if (!lines.length) return (
    <section className="sec"><div className="wrap"><h2>Your cart</h2><p className="empty">Your cart is empty.</p><Link className="btn dk" to="/shop">SHOP NOW</Link></div></section>
  );
  const href = orderLink({ name, country: COUNTRIES[country].name, lines, total, cur });
  return (
    <section className="sec">
      <div className="wrap">
        <h2>Your cart</h2>
        {lines.map((l) => (
          <div className="cl" key={l.key}>
            <div className="th"><Pic p={l.p} /></div>
            <div><h3>{l.name}</h3><p>{l.size} · {l.color}</p><p>{fmt(l.price, cur)}</p></div>
            <div className="qty"><button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Less">−</button><span>{l.qty}</span><button onClick={() => setQty(l.key, l.qty + 1)} aria-label="More">+</button></div>
            <strong>{fmt(l.price * l.qty, cur)}</strong>
            <button className="rm" onClick={() => remove(l.key)} aria-label="Remove item">✕</button>
          </div>
        ))}
        <div className="sum">
          <label className="lbl" htmlFor="nm">YOUR NAME (OPTIONAL)</label>
          <input id="nm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <div className="tot"><span>TOTAL</span><strong>{fmt(total, cur)}</strong></div>
          <p className="note">Delivery country: {COUNTRIES[country].name} (change it in the header). You confirm and send your order on WhatsApp. No online payment yet.</p>
          <a className="btn solid wide" href={href} target="_blank" rel="noopener">ORDER ON WHATSAPP</a>
        </div>
      </div>
    </section>
  );
}
