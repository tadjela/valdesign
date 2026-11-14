export const COUNTRIES = {
  EG: { name: 'Egypt', cur: 'EGP', field: 'priceEGP' },
  TG: { name: 'Togo', cur: 'XOF', field: 'priceXOF' },
};
export const fmt = (n, cur) => `${Number(n).toLocaleString('fr-FR')} ${cur}`;
