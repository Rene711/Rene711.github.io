
export interface CocktailBad {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  "strInstructionsZH-HANS": string | null;
  "strInstructionsZH-HANT": string | null;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
export interface IngredientMeasure {
  ingredient: string | null;
  measure: string | null;
}
export interface Instruction {
  language: string;
  instruction: string | null;
}
export interface Cocktail {
  idDrink: string;
  drink: string;
  drinkAlternate: string | null;
  tags: string | null;
  video: string | null;
  category: string;
  IBA: string | null;
  alcoholic: string;
  glass: string;
  instructions: Instruction[];
  drinkThumb: string;
  //strIngredients: string[] | null;
  //strMeasures: string[] | null;
  ingredients: IngredientMeasure[];
  imageSource: string | null;
  imageAttribution: string | null;
  creativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
export function parseCocktail(oldCocktail: CocktailBad): Cocktail {
  let retVal: Cocktail = {
    idDrink: oldCocktail.idDrink,
    drink: oldCocktail.strDrink,
    drinkAlternate: oldCocktail.strDrinkAlternate,
    tags: oldCocktail.strTags,
    video: oldCocktail.strVideo,
    category: oldCocktail.strCategory,
    IBA: oldCocktail.strIBA,
    alcoholic: oldCocktail.strAlcoholic,
    glass: oldCocktail.strGlass,
    instructions: [],
    drinkThumb: oldCocktail.strDrinkThumb,
    ingredients: [],
    imageSource: oldCocktail.strImageSource,
    imageAttribution: oldCocktail.strImageAttribution,
    creativeCommonsConfirmed: oldCocktail.strCreativeCommonsConfirmed,
    dateModified: oldCocktail.dateModified
  }
  retVal.instructions.push({ language: "English", instruction: oldCocktail.strInstructions });
  retVal.instructions.push({ language: "Espaniol", instruction: oldCocktail.strInstructionsES });
  retVal.instructions.push({ language: "German", instruction: oldCocktail.strInstructionsDE });
  retVal.instructions.push({ language: "French", instruction: oldCocktail.strInstructionsFR });
  retVal.instructions.push({ language: "Italian", instruction: oldCocktail.strInstructionsIT });
  retVal.instructions.push({ language: "Simplified Chinese", instruction: oldCocktail["strInstructionsZH-HANS"] });
  retVal.instructions.push({ language: "Traditional Chinese", instruction: oldCocktail["strInstructionsZH-HANT"] });

  retVal.instructions = retVal.instructions.filter(x => x.instruction != null);

  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient1, measure: oldCocktail.strMeasure1 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient2, measure: oldCocktail.strMeasure2 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient3, measure: oldCocktail.strMeasure3 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient4, measure: oldCocktail.strMeasure4 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient5, measure: oldCocktail.strMeasure5 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient6, measure: oldCocktail.strMeasure6 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient7, measure: oldCocktail.strMeasure7 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient8, measure: oldCocktail.strMeasure8 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient9, measure: oldCocktail.strMeasure9 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient10, measure: oldCocktail.strMeasure10 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient11, measure: oldCocktail.strMeasure11 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient12, measure: oldCocktail.strMeasure12 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient13, measure: oldCocktail.strMeasure13 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient14, measure: oldCocktail.strMeasure14 });
  retVal.ingredients.push({ ingredient: oldCocktail.strIngredient15, measure: oldCocktail.strMeasure15 });

  retVal.ingredients = retVal.ingredients.filter(x => x.ingredient != null);

  return retVal;

}
