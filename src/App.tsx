import { useEffect, useState } from 'react'
import './App.scss'
import RecipeCard from './components/RecipeCard';
import type { Recipe } from './components/RecipeCard';


function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div>
      <h2>Welcome to the Recipository: The Recipe Repository!</h2>
      <div className="recipe-list">
        {recipes.map((r) => (
          <RecipeCard key={(r as any).id ?? r.id} recipe={r} />
        ))}
      </div>
    </div>
  )
}

export default App
