import { Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RecipesList from './components/Recipes/RecipesList';
import Recipes from './components/Recipes/Recipes';
import logo from './assets/logo.png';
import Sidebar from './components/Sidebar';
import {
  setTokenAndPseudoToLocalStorage,
  getTokenAndPseudoInLocalStorage,
  removeTokenAndPseudoFromLocalStorage,
} from './components/localStorage';

export type Root = Root2[];

export interface Root2 {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  difficulty: string;
  description: string;
  instructions: string[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  id: number;
  quantity: number;
  unit: string;
}

function App() {
  const [recipes, setRecipes] = useState<Root2[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // on fetch l'API
        const response = await axios.get(
          ' https://orecipesapi.onrender.com/api/recipes'
        );
        console.log(response);

        // on recupère les recettes
        const recipesArray = response.data;

        // on enregistre les recettes dans le state
        setRecipes(recipesArray);
      } catch (e) {
        // console.log('erreur');
      }
    };
    fetchRecipes();
  }, []);

  const myRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // 3. accéder à l'élément du DOM après le rendu
    console.log(myRef.current);
  }, []);

  const { pathname } = useLocation();
  // à chaque re rendu de RecipePage -> re rendu ou l'url à changé
  // on veut scroll la page (window) à zéro
  // window.scrollTo(0, 0)
  useEffect(() => {
    // à chaque re rendu de App on scroll en haut de page
    console.log('effet joué');

    myRef.current?.scrollTo({
      top: 0,
    });
  }, [pathname]);

  // STATE pour le pseudo
  const [pseudo, setPseudo] = useState<null | string>(null);

  // STATE pour le message d'erreur
  const [error, setError] = useState<null | string>(null);

  // au rendu de la page, on va chercher dans le localStorage si y'a un token et un pseudo on les placent dans le state
  useEffect(() => {
    const tokenAndPSeudo = getTokenAndPseudoInLocalStorage();

    if (tokenAndPSeudo) {
      setPseudo(tokenAndPSeudo.pseudo);
    }
  }, []);

  const checkCredentials = async (email: string, password: string) => {
    try {
      // on envoie au back l'email et le password avec une requete POST
      const response = await axios.post(
        // adresse de la requete
        'https://orecipesapi.onrender.com/api/login',
        // les données qu'on envoie au back en post
        {
          email,
          password,
        }
      );
      console.log(response);

      // si j'ai une reponse ok je veux afficher le pseudo dans la page

      // si on reçoit une 200 on enregistre le pseudo reçu dans le state
      setPseudo(response.data.pseudo);

      // on engeristre le JSONWebToken dans le state de App grace au setter setToken que App nous a envoyé via une prop
      // setToken(response.data.token);

      // on enregistre le token et le pseudo dans le localStorage
      setTokenAndPseudoToLocalStorage(
        response.data.token,
        response.data.pseudo
      );

      // et on vire la potentielle erreur du state
      setError(null);
    } catch (e) {
      // si par contre on a catch une erreur et qu'on reçoit une 4011 on renregistre une erreur dans le state
      setError('erreur de connexion, veuillez réessayer');
    }
  };

  return (
    <div className="App flex flex-col h-screen ">
      <header className="flex flex-wrap items-center justify-between py-6 px-8 bg-blue-900 shadow-inner	shadow-gray-900/80	">
        <Link to="/">
          <img src={logo} alt="logo" className="h-14 mr-4 cursor-pointer" />
        </Link>
        <p className="text-white text-4xl font-mono"> Les recettes oRecipes </p>
        {pseudo ? (
          <>
            <p className="text-sky-400 text-2xl">Bonjour {pseudo}</p>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-800"
              onClick={() => {
                // on est deconnecté si le peudo est null
                setPseudo(null);
                // setToken(null);

                // on vide le localStorage
                removeTokenAndPseudoFromLocalStorage();
              }}
            >
              Deconnexion
            </button>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const email = formData.get('mail') as string;
              const password = formData.get('pass') as string;

              // on execute la fonction qui fait la requete au back
              // et on lui donne en paramètres l'email et le password des inputs
              checkCredentials(email, password);
            }}
            className="flex gap-4"
          >
            {' '}
            {error && <p className="error">{error}</p>}
            <div className="">
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email"
                name="mail"
                required
              />
            </div>
            <div className="">
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="password"
                name="pass"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        )}
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar recipes={recipes} />
        <main ref={myRef} className="flex-1 overflow-y-auto p-4 ">
          <Routes>
            <Route path="/" element={<RecipesList recipes={recipes} />} />
            <Route
              path="/recipes/:slug"
              element={<Recipes recipes={recipes} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
