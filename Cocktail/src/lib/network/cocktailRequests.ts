import { DOMAIN, favorites } from "$lib/general/store";
import { parseCocktail, type Cocktail, type CocktailBad } from "$lib/types/cocktailType";
import { get } from "svelte/store";

export async function requestCocktailByFirstLetter(letter: string): Promise<Cocktail[] | undefined> {
  const response = await fetch(`${DOMAIN}/api/json/v1/1/search.php?f=${letter[0].toLowerCase()}`);
  if (response.ok) {

    const badCocktails: CocktailBad[] = (await response.json()).drinks;
    return badCocktails.map(x => parseCocktail(x));
  }
  return undefined;
}
export async function requestRandomCocktail(): Promise<Cocktail | undefined> {
  const response = await fetch(`${DOMAIN}/api/json/v1/1/random.php`);
  if (response.ok) {

    const badCocktails: CocktailBad[] = (await response.json()).drinks;
    return parseCocktail(badCocktails[0]);
  }
  return undefined;
}
export async function requestFavorites(): Promise<Cocktail[] | undefined> {
  let retVal: Cocktail[] = [];
  for (const fav of get(favorites)) {
    const response = await fetch(`${DOMAIN}/api/json/v1/1/lookup.php?i=${fav}`);
    if (response.ok) {
      const badCocktail: CocktailBad = (await response.json()).drinks[0];
      retVal.push(parseCocktail(badCocktail));
    } else {
      return undefined;
    }
  }
  return retVal;
}
