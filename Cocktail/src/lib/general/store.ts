import { get, writable } from "svelte/store";

export const DOMAIN = 'https://www.thecocktaildb.com';

export const allColors = [
  { id: "rosewater", name: "Rosewater" },
  { id: "flamingo", name: "Flamingo" },
  { id: "pink", name: "Pink" },
  { id: "mauve", name: "Mauve" },
  { id: "red", name: "Red" },
  { id: "maroon", name: "Maroon" },
  { id: "peach", name: "Peach" },
  { id: "yellow", name: "Yellow" },
  { id: "green", name: "Green" },
  { id: "teal", name: "Teal" },
  { id: "sky", name: "Sky" },
  { id: "sapphire", name: "Sapphire" },
  { id: "blue", name: "Blue" },
  { id: "lavender", name: "Lavender" },
  { id: "text", name: "Text" },
  { id: "subtext1", name: "Subtext1" },
  { id: "subtext0", name: "Subtext0" },
  { id: "overlay2", name: "Overlay2" },
  { id: "overlay1", name: "Overlay1" },
  { id: "overlay0", name: "Overlay0" },
  { id: "surface2", name: "Surface2" },
  { id: "surface1", name: "Surface1" },
  { id: "surface0", name: "Surface0" },
  { id: "base", name: "Base" },
  { id: "mantle", name: "Mantle" },
  { id: "crust", name: "Crust" },
  //--accent:var(--ctp-sapphire);
];
export function save() {
  localStorage.setItem(colorFavorIndexKey, get(colorFlavorIndex).toString());
  localStorage.setItem(accentColorIndexKey, get(accentColorIndex).toString());
  localStorage.setItem(favoritesKey, JSON.stringify(get(favorites)));

}
export let colorFlavorIndex = writable<number>(3);
export let accentColorIndex = writable<number>(11);
export let favorites = writable<string[]>([]);
export function load() {
  colorFlavorIndex.set(Number(localStorage.getItem(colorFavorIndexKey)) && 3);
  accentColorIndex.set(Number(localStorage.getItem(accentColorIndexKey)) && 11);
  favorites.set(JSON.parse(localStorage.getItem(favoritesKey) || '[]'));
}
export function resetSettings() {
  colorFlavorIndex.update(_ => 3);
  accentColorIndex.update(_ => 11);
  favorites.update(_ => []);
}

const colorFavorIndexKey = 'saved-color-flavor';
const accentColorIndexKey = 'saved-accent-color';
const favoritesKey = 'saved-favorites';
export const colorFlavors = [{ id: 'latte', name: 'Latte' }, { id: 'frappe', name: 'Frappé' }, { id: 'macchiato', name: 'Macchiato' }, { id: 'mocha', name: 'Mocha' }];

