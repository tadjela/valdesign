import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { fmt } from '../utils/currency';

export function Pic({ p, i = 0 }) {
  return p.images?.[i]
    ? <img src={p.images[i]} alt={p.name} loading="lazy" />
    : <div className="ph" style={{ '--c': p.colors[0].hex }} role="img" aria-label={p.name}>VD</div>;
}

export default function ProductCard({ p }) {
  const { price, cur } = useStore();
  return (
    <Link to={`/product/${p.id}`} className="pc">
      <div className="im"><Pic p={p} />{p.isNew && <span className="tag">NEW</span>}{p.stock < 1 && <span className="tag out">SOLD OUT</span>}</div>
      <h3>{p.name}</h3>
      <p>{fmt(price(p), cur)}</p>
      <span className="more">VIEW PRODUCT</span>
    </Link>
  );
}
