import { useEffect, useState } from 'react'
import './App.scss'
import RecipeCard from './components/RecipeCard';
import type { Recipe } from './components/RecipeCard';
import Sidebar from './components/Sidebar';


function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  // derive unique tags from recipes
  const tags = Array.from(new Set(recipes.flatMap((r) => (Array.isArray((r as any).tags) ? (r as any).tags : []))));

  return (
    <div className="app-layout">
      <div className="sidebar-container">
        <Sidebar
          query={query}
          onQueryChange={setQuery}
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={(t) => setSelectedTag(t)}
        />
      </div>
      <div className="main-content">
        <div className="recipe-list">
          {recipes
            .filter((r) => {
              const q = query.trim().toLowerCase();
              if (selectedTag) {
                if (!Array.isArray((r as any).tags) || !(r as any).tags.includes(selectedTag)) return false;
              }
              if (!q) return true;
              const name = (r.name ?? '').toLowerCase();
              if (name.includes(q)) return true;
              if (Array.isArray((r as any).tags) && (r as any).tags.some((t: string) => t.toLowerCase().includes(q))) return true;
              // search inside step ingredients
              const steps = (r as any).steps ?? [];
              for (const s of steps) {
                const ings = s.ingredients ?? [];
                for (const ing of ings) {
                  if (String(ing).toLowerCase().includes(q)) return true;
                }
              }
              return false;
            })
            .map((r) => (
              <RecipeCard key={(r as any).id ?? r.id} recipe={r} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default App
