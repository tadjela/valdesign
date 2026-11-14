import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { COUNTRIES } from '../utils/currency';
import { waBase } from '../utils/whatsapp';

const I = {
  search: <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>,
  cart: <svg viewBox="0 0 24 24"><path d="M3 4h3l2.5 11h9L20 7H7" /><circle cx="10" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></svg>,
  menu: <svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" /></svg>,
};
const LINKS = [['/', 'HOME'], ['/shop', 'SHOP'], ['/collections', 'COLLECTIONS'], ['/about', 'ABOUT']];

function AnnouncementBar() {
  return (
    <div className="ann" aria-label="VAL'S DESIGN — STREETWEAR COLLECTION">
      <div aria-hidden>{Array.from({ length: 12 }).map((_, i) => <span key={i}>VAL'S DESIGN — STREETWEAR COLLECTION</span>)}</div>
    </div>
  );
}

function Navbar() {
  const { country, setCountry, count, bump } = useStore();
  const [open, setOpen] = useState(false);
  const [s, setS] = useState(false);
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  const go = (e) => { e.preventDefault(); nav(`/shop?q=${encodeURIComponent(q)}`); setS(false); setQ(''); };
  const links = LINKS.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'}>{t}</NavLink>);
  return (
    <header className="nav">
      <div className="wrap">
        <Link to="/" className="brand"><img className="logo" src="/logo/vd-white.png" alt="VD" /><span className="bn">VAL'S DESIGN</span></Link>
        <nav className="links">{links}</nav>
        <form className={'sbox' + (s ? ' open' : '')} onSubmit={go}>
          <input aria-label="Search products" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} tabIndex={s ? 0 : -1} />
          <button type="button" className="ico" aria-label="Toggle search" onClick={() => setS((v) => !v)}>{I.search}</button>
        </form>
        <select className="sel" value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country and currency">
          {Object.entries(COUNTRIES).map(([k, c]) => <option key={k} value={k}>{c.name} · {c.cur}</option>)}
        </select>
        <Link to="/cart" className="ico" aria-label={`Cart, ${count} items`}>{I.cart}{count > 0 && <b key={bump} className="badge">{count}</b>}</Link>
        <button className="ico burger" aria-label="Menu" onClick={() => setOpen(!open)}>{I.menu}</button>
      </div>
      <nav className={'mm' + (open ? ' open' : '')}>{links}</nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="fg">
          <div>
            <div className="brand"><img className="logo" src="/logo/vd-white.png" alt="VD" /><span className="bn">VAL'S DESIGN</span></div>
            <p className="fp">Premium streetwear from Egypt to Togo. More than clothing. It's an identity.</p>
          </div>
          <div><h4>Shop</h4><Link to="/shop">All products</Link><Link to="/new">New arrivals</Link><Link to="/collections">Collections</Link></div>
          <div><h4>Help</h4><Link to="/contact">Contact</Link><Link to="/delivery">Delivery & returns</Link><a href={waBase} target="_blank" rel="noopener">WhatsApp</a></div>
          <div><h4>Follow</h4><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">Facebook</a></div>
        </div>
        <div className="fb">
          <span>© {new Date().getFullYear()} VAL'S DESIGN. All rights reserved.</span>
          <span><Link to="/terms">Terms</Link><Link to="/privacy">Privacy</Link></span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (<><AnnouncementBar /><Navbar /><main><Outlet /></main><Footer /></>);
}
