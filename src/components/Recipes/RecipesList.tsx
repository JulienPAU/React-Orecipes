import { Link } from 'react-router-dom';
import type { Root2 } from '../../App';

interface RecipesListProps {
  recipes: Root2[];
}

export default function RecipesList({ recipes }: RecipesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-5 font-mono">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={recipe.thumbnail}
            alt={recipe.title}
            className="w-full h-64 object-cover sm:h-48"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-600">Difficulté : {recipe.difficulty}</p>
            <Link
              to={`/recipes/${recipe.slug}`}
              className="block mt-4 text-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Voir la recette
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
