import { useState, useEffect, useMemo } from "react";
import EnemyCard from "./components/EnemyCard";
import { API_BASE_URL } from "./config/api";
import { getTheme } from "./config/areaThemes";
import AreaWheelPicker from "./components/AreaWheelPicker";
import FilterBar from "./components/FilterBar";
import EnemyDetailModal from "./components/EnemyDetailModal";

function App() {
  const [enemies, setEnemies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedEnemy, setSelectedEnemy] = useState(null);

  const categoryOrder = { normal: 0, "mini-boss": 1, boss: 2, hidden: 3 };

  useEffect(() => {
    async function fetchEnemies() {
      try {
        const response = await fetch(`${API_BASE_URL}/enemies?limit=100`);

        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de enemigos");
        }

        const data = await response.json();
        setEnemies(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEnemies();
  }, []);

  const theme = getTheme(selectedArea);

  const visibleEnemies = enemies
    .filter((enemy) => {
      if (selectedArea && enemy.area !== selectedArea) return false;
      if (
        nameFilter &&
        !enemy.name.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let comparison = 0;
      if (sortBy === "category") {
        comparison = categoryOrder[a.type] - categoryOrder[b.type];
      } else if (sortBy === "health") {
        comparison = a.health - b.health;
      }

      return sortDirection === "desc" ? -comparison : comparison;
    });

  const areas = useMemo(
    () => [...new Set(enemies.map((e) => e.area))].sort(),
    [enemies]
  );

  return (
    <div
      className="min-h-screen transition-[background] duration-700 ease-out"
      style={{ background: theme.bg }}
    >
      <h1 className="text-4xl font-bold text-stone-100 tracking-wide text-center pt-8 pb-2 transition-colors duration-700 ease-out">
        Hollow Knight{" "}
        <span
          className="transition-colors duration-700 ease-out"
          style={{ color: theme.accent }}
        >
          Enemies
        </span>
      </h1>

      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-52 flex-shrink-0 flex flex-col items-center pt-6 pb-2 md:pt-16 md:pb-0 md:sticky md:top-0 md:h-screen">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
            Zona
          </p>
          {areas.length > 0 && (
            <AreaWheelPicker
              areas={areas}
              selectedArea={selectedArea}
              onSelect={setSelectedArea}
              accentColor={theme.accent}
            />
          )}
        </aside>

        <main className="flex-1 px-6 py-10">
          <p
            className="text-center mb-8 text-sm transition-colors duration-700 ease-out"
            style={{ color: theme.accent }}
          >
            {selectedArea || "Todas las zonas"}
          </p>

          <FilterBar
            nameFilter={nameFilter}
            onNameChange={setNameFilter}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={(field, direction) => {
              setSortBy(field);
              setSortDirection(direction);
            }}
            accentColor={theme.accent}
          />

          {loading && (
            <p className="text-center text-neutral-400">Cargando enemigos...</p>
          )}

          {error && <p className="text-center text-red-400">Error: {error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {visibleEnemies.map((enemy) => (
                <EnemyCard
                  key={enemy.id}
                  enemy={enemy}
                  onClick={() => setSelectedEnemy(enemy)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="text-center text-xs text-neutral-500 py-6 px-4">
        Hollow Knight, sus personajes e imágenes © Team Cherry. Imágenes obtenidas de la{" "}
        <a
          href="https://hollowknight.fandom.com/es/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-neutral-300"
        >
          Hollow Knight Wiki
        </a>
        . Proyecto de fan sin ánimo de lucro, no afiliado a Team Cherry.
      </footer>

      <EnemyDetailModal
        enemy={selectedEnemy}
        onClose={() => setSelectedEnemy(null)}
        accentColor={theme.accent}
      />
    </div>
  );
}

export default App;
