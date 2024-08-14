import { NavLink } from 'react-router-dom';

import type { Root2 } from '../App';
import { useState } from 'react';

interface SidebarProps {
  recipes: Root2[];
}

export default function Sidebar({ recipes }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        type="button"
        className="block md:hidden p-2 bg-blue-900 text-white fixed top-4 right-4 z-20"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Fermer' : 'Ouvrir'}
      </button>
      <div
        className={`w-64 bg-blue-900 text-white h-screen overflow-y-auto shadow-inner shadow-gray-900/80 font-mono transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-10 md:z-0`}
      >
        <nav className="p-4">
          <NavLink
            to="/"
            className="block mb-4 text-white-700 hover:text-gray-900 hover:bg-white p-2 rounded-md"
          >
            Accueil
          </NavLink>
          <h3 className="font-semibold mb-5">Recettes ({recipes.length})</h3>
          {recipes.map((recipe) => (
            <NavLink
              key={recipe.id}
              to={`/recipes/${recipe.slug}`}
              className="block mb-1 text-white-700 hover:text-gray-900 m-5 p-2 hover:bg-white rounded-md"
            >
              {recipe.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
