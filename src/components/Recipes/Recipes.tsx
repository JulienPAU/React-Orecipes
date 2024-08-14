import { useParams } from 'react-router-dom';
import type { Root2 } from '../../App';

interface RecipesListProps {
  recipes: Root2[];
}

export default function Recipes({ recipes }: RecipesListProps) {
  // on déclenche la fonction scrollTo de window lorsque l'on change de page

  const params = useParams();
  const urlRecipeId = params.slug;

  const recipesToDisplay = recipes.find((recipe) => {
    // on renvoie vrai si on est sur la ligne du pokemon dont l'id vaut pokedex_id (de l'URL)
    return recipe.slug === urlRecipeId;
  });
  console.log(recipesToDisplay);

  if (!recipesToDisplay) {
    return <div>Aucune recette trouvée avec le slug fourni.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center font-mono">
      <div className="w-full sm:w-1/2 h-full">
        <img
          src={recipesToDisplay.thumbnail}
          alt={recipesToDisplay.title}
          className="w-full h-80 object-cover rounded-lg"
        />
      </div>

      <div
        key={recipesToDisplay.id}
        className="bg-white shadow-md rounded-lg overflow-hidden m-5 w-full sm:w-1/2"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">
            {recipesToDisplay.title}
          </h2>
          <p className="text-gray-600">Ingrédients :</p>
          <ul className="list-disc list-inside text-gray-600">
            {recipesToDisplay.ingredients.map((ingredient) => (
              <li key={ingredient.name}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-1/2">
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <div className="space-y-8">
            {recipesToDisplay.instructions.map((instruction) => (
              <p key={instruction[0]} className="text-gray-600">
                {instruction}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
