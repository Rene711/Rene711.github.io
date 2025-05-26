import { get } from "svelte/store";
import { accentColorIndex, allColors } from "./store";

export const getCssVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
};
const setCssVariable = (variableName: string, value: string): void => {
  document.documentElement.style.setProperty(variableName, value);
};
export function updateColorScheme(scheme: string): void {
  for (const el of allColors) {
    setCssVariable(`--ctp-${el.id}`, getCssVariable(`--ctp-${scheme}-${el.id}`));
  }
  setCssVariable('--accent', getCssVariable(`--ctp-${allColors[get(accentColorIndex)].id}`));
}
export function setAccentColor() {
  setCssVariable('--accent', getCssVariable(`--ctp-${allColors[get(accentColorIndex)].id}`));
}
