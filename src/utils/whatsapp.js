import { fmt } from './currency';
export const WA_NUMBER = '201097742045';
export const waBase = `https://wa.me/${WA_NUMBER}`;
export function orderLink({ name, country, lines, total, cur }) {
  const text = [
    "Hello VAL'S DESIGN, I'd like to order:",
    ...(name ? [`Name: ${name}`] : []),
    `Country: ${country}`,
    '',
    ...lines.map((l, i) => `${i + 1}. ${l.name} | ${l.size} | ${l.color} | ${l.qty} x ${fmt(l.price, cur)}`),
    '',
    `TOTAL: ${fmt(total, cur)}`,
  ].join('\n');
  return `${waBase}?text=${encodeURIComponent(text)}`;
}
