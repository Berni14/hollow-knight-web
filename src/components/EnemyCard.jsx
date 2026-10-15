import { EnemyTypeIcon } from '../config/enemyIcons';
import { getEnemyImage } from '../config/enemyImages';

function EnemyCard({ enemy, onClick }) {
  const typeColors = {
    normal: 'bg-neutral-800 text-neutral-300 border-neutral-600',
    'mini-boss': 'bg-cyan-950 text-cyan-200 border-cyan-700',
    boss: 'bg-neutral-900 text-orange-200 border-orange-600',
    hidden: 'bg-neutral-900 text-violet-200 border-violet-600',
  };
  const image = getEnemyImage(enemy);
  return (

    <div
    onClick={onClick}
     className="bg-neutral-950 rounded-lg p-4 border border-neutral-800 hover:border-cyan-500 transition-colors">
      <div className="h-32 mb-3 flex items-center justify-center">
        {image ? (
          <img src={image} alt={enemy.name} loading="lazy" className="max-h-full max-w-full object-contain" />
        ) : (
          <EnemyTypeIcon type={enemy.type} size={48} className="text-neutral-600" />
        )}
      </div>
      <div className="flex justify-between items-start mb-2">
     <div className="flex items-center gap-2">
       <h3 className="text-lg font-semibold text-stone-100">{enemy.name}</h3>
     </div>
     <span className={`text-xs px-2 py-1 rounded-full border ${typeColors[enemy.type] || typeColors.normal}`}>
       {enemy.type}
     </span>
   </div>
      <p className="text-sm text-neutral-500 mb-3">{enemy.area}</p>
      <p className="text-sm text-neutral-400 line-clamp-3">{enemy.description}</p>
      <div className="flex gap-4 mt-3 text-xs text-neutral-500">
        <span>❤️ {enemy.health}</span>
        <span>⚔️ {enemy.damage}</span>
      </div>
    </div>
  );
}

export default EnemyCard;