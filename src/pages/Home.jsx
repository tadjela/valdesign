import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, CATEGORIES } from '../data/products';

export function Categories() {
  return (
    <div className="cats">
      {CATEGORIES.map((c) => (
        <Link key={c.key} className="cat" to={c.key === 'new' ? '/new' : `/shop?cat=${c.key}`}
          style={{ '--img': `url(/images/collections/${c.img})`, '--c': c.c }}>
          <h3>{c.title}</h3><span>SHOP NOW</span>
        </Link>
      ))}
    </div>
  );
}

export function Collections() {
  return <section className="sec"><div className="wrap"><h2>Collections</h2><Categories /></div></section>;
}

const BENEFITS = [
  ['✈', 'FAST SHIPPING', 'Delivery to Egypt and Togo, arranged with you on WhatsApp.'],
  ['✓', 'SECURE ORDER', 'Simple order, with a real person confirming every detail.'],
  ['✆', 'EASY CONTACT', 'Message us on WhatsApp, we answer directly.'],
  ['★', 'PREMIUM QUALITY', 'Heavy fabrics and clean finishing on every piece.'],
];

export default function Home() {
  const feat = products.filter((p) => p.featured).slice(0, 10);
  return (
    <>
      <section className="hero">
        <img className="wm" src="/logo/vd-white.png" alt="" aria-hidden />
        <div className="wrap">
          <h1>
            <span className="ln"><i style={{ '--d': 0 }}>Built for</i></span>
            <span className="ln"><i style={{ '--d': 1 }}>the real</i></span>
            <span className="ln"><i style={{ '--d': 2 }}>ones.</i></span>
          </h1>
          <div className="hb">
            <p>More than clothing. It's an identity.</p>
            <Link to="/shop" className="btn">SHOP NOW</Link>
          </div>
        </div>
      </section>

      <div className="strip" aria-hidden><div>{Array.from({ length: 10 }).map((_, i) => <span key={i}>STREETWEAR ✦ EGYPT ✦ TOGO ✦ VD ✦</span>)}</div></div>

      <section className="sec"><div className="wrap"><h2>Shop by category</h2><Categories /></div></section>

      <section className="fresh">
        <div className="wrap">
          <div>
            <h2>Fresh<br />Drops</h2>
            <p>New pieces, straight from the studio. Check back often.</p>
            <Link to="/new" className="btn">VIEW ALL</Link>
          </div>
          <div className="fimg" style={{ '--img': 'url(/images/hero/fresh.jpg)' }} />
          <div className="fmsg"><h3>Wear it loud.<br />Wear it yours.</h3><p className="sig">VAL'S DESIGN</p></div>
        </div>
      </section>

      <section className="ben">
        <div className="wrap bg">
          {BENEFITS.map(([ic, t, d]) => (
            <div key={t}><span className="bi" aria-hidden>{ic}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Featured</h2>
          <div className="grid">{feat.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </section>
    </>
  );
}
