import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const TABS = [['all', 'ALL'], ['tshirts', 'T-SHIRTS'], ['hoodies', 'HOODIES'], ['caps', 'CAPS']];

export default function Shop({ onlyNew }) {
  const [sp, setSp] = useSearchParams();
  const cat = sp.get('cat') || 'all';
  const q = (sp.get('q') || '').toLowerCase();
  const list = products.filter((p) => (!onlyNew || p.isNew) && (cat === 'all' || p.category === cat) && p.name.toLowerCase().includes(q));
  return (
    <section className="sec">
      <div className="wrap">
        <h2>{onlyNew ? 'New arrivals' : 'Shop'}</h2>
        <div className="tabs">
          {TABS.map(([k, t]) => <button key={k} className={cat === k ? 'on' : ''} onClick={() => setSp(k === 'all' ? {} : { cat: k })}>{t}</button>)}
        </div>
        {list.length
          ? <div className="grid">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          : <p className="empty">No product found. Try another category or search.</p>}
      </div>
    </section>
  );
}
