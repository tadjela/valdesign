import { Link } from 'react-router-dom';
import { waBase } from '../utils/whatsapp';

const PAGES = {
  about: ['About', ["VAL'S DESIGN is a streetwear brand built around identity. We design hoodies, t-shirts and caps for people who dress like they mean it.", "Based between Egypt and Togo, we make every drop simple to order and personal to receive."]],
  contact: ['Contact', ['The fastest way to reach us is WhatsApp. Ask about sizes, colors, availability or your order.']],
  delivery: ['Delivery & returns', ['Delivery time, fees and return conditions are confirmed with you on WhatsApp before each order.', 'TODO: write the final delivery and returns policy here before launch.']],
  terms: ['Terms of sale', ['TODO: add the final terms of sale here before launch.']],
  privacy: ['Privacy policy', ['The cart is stored only in your browser. Orders are sent by you through WhatsApp.', 'TODO: complete this policy before launch.']],
};

export default function Static({ page }) {
  const [title, paras] = PAGES[page];
  return (
    <section className="sec"><div className="wrap prose">
      <h2>{title}</h2>
      {paras.map((t, i) => <p key={i}>{t}</p>)}
      {page === 'contact' && <a className="btn dk" href={waBase} target="_blank" rel="noopener">CHAT ON WHATSAPP</a>}
    </div></section>
  );
}

export function NotFound() {
  return <section className="sec"><div className="wrap prose"><h2>Page not found</h2><p>This page does not exist or has moved.</p><Link className="btn dk" to="/">BACK HOME</Link></div></section>;
}
