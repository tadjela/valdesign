import raw from './products.json';
export const products = raw.products.filter((p) => p.published);
export const CATEGORIES = [
  { key: 'tshirts', title: 'T-SHIRTS', img: 'tshirts.jpg', c: '#1d1d1d' },
  { key: 'hoodies', title: 'HOODIES', img: 'hoodies.jpg', c: '#2a2a2a' },
  { key: 'caps', title: 'CAPS', img: 'caps.jpg', c: '#161616' },
  { key: 'new', title: 'NEW ARRIVALS', img: 'new.jpg', c: '#333' },
];
