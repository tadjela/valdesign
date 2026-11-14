import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pic } from '../components/ProductCard';
import { NotFound } from './Static';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { fmt } from '../utils/currency';

export default function ProductDetails() {
  const { id } = useParams();
  const p = products.find((x) => x.id === id);
  const { add, price, cur } = useStore();
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [err, setErr] = useState(0);
  const [ok, setOk] = useState(false);
  if (!p) return <NotFound />;
  const sz = size || (p.sizes.length === 1 ? p.sizes[0] : '');
  const cl = color || (p.colors.length === 1 ? p.colors[0].name : '');
  const submit = () => {
    if (!sz || !cl) { setErr((n) => n + 1); return; }
    setErr(0); add({ id: p.id, size: sz, color: cl, qty });
    setOk(true); setTimeout(() => setOk(false), 1600);
  };
  return (
    <section className="sec">
      <div className="wrap pd">
        <div>
          <div className="im big"><Pic p={p} i={img} /></div>
          {p.images.length > 1 && <div className="thumbs">{p.images.map((_, i) => <button key={i} className={img === i ? 'on' : ''} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`}><Pic p={p} i={i} /></button>)}</div>}
        </div>
        <div className="info">
          <h1>{p.name}</h1>
          <p className="pr">{fmt(price(p), cur)}</p>
          <p className="desc">{p.description}</p>
          <div className="lbl">SIZE</div>
          <div className="chips">{p.sizes.map((s) => <button key={s} className={'chip' + (sz === s ? ' on' : '')} onClick={() => setSize(s)}>{s}</button>)}</div>
          <div className="lbl">COLOR {cl && `— ${cl}`}</div>
          <div className="chips">{p.colors.map((c, ci) => <button key={c.name} className={'sw' + (cl === c.name ? ' on' : '')} style={{ background: c.hex }} title={c.name} aria-label={c.name} onClick={() => { setColor(c.name); if (p.images[ci]) setImg(ci); }} />)}</div>
          <div className="lbl">QUANTITY</div>
          <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less">−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)} aria-label="More">+</button></div>
          {err > 0 && <p className="err" key={err}>Choose a size and a color first.</p>}
          <button className="btn solid add" disabled={p.stock < 1} onClick={submit}>{p.stock < 1 ? 'SOLD OUT' : ok ? 'ADDED ✓' : 'ADD TO CART'}</button>
          <p className="stock">{p.stock > 0 ? `In stock (${p.stock} available)` : 'Currently unavailable'}</p>
        </div>
      </div>
    </section>
  );
}
