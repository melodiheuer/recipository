import './RecipeCard.scss';

export type RecipeStep = {
    ingredients: string[];
    id: string;
    order: number;
    directions: string;
};

export type Recipe = {
  id?: number | string;
  name: string;
  steps?: RecipeStep[];
  yieldCount: number;
  yieldType: string;
  totalCarbs?: number;
};

export function RecipeStep({recipeStep}: {recipeStep: RecipeStep}) {
  return (
    <div className="recipe-step">
      <ul className="ingredients-list">
        {recipeStep.ingredients.map((ingredient, idx) => (
          <li key={idx} className="ingredient-item">{ingredient}</li>
        ))}
      </ul>
      <p className="directions">{recipeStep.directions}</p>
    </div>
  );
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="recipe-card"> 
        <h2 className="recipe-name">{recipe.name}</h2>
        <hr className="divider" />
        {recipe.steps?.map((step) => (
          <RecipeStep key={step.id} recipeStep={step} />
        ))}
        <hr className="divider" />
        <p className="yield">Yield: {recipe.yieldCount} {recipe.yieldType}</p>

    </div>
  );
}