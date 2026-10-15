import { X } from 'lucide-react';
import { EnemyTypeIcon } from '../config/enemyIcons';
import { getEnemyImage } from '../config/enemyImages';

function EnemyDetailModal({ enemy, onClose, accentColor }) {
  if (!enemy) return null;

  const image = getEnemyImage(enemy);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 border rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-300"
        style={{ borderColor: accentColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-stone-100 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mb-4">
          {image ? (
            <img src={image} alt={enemy.name} className="h-40 max-w-full object-contain mb-4" />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2"
              style={{ borderColor: accentColor, backgroundColor: `${accentColor}1a` }}
            >
              <EnemyTypeIcon type={enemy.type} size={40} style={{ color: accentColor }} />
            </div>
          )}

          <h2 className="text-2xl font-bold text-stone-100">{enemy.name}</h2>
          <p className="text-sm text-neutral-400 mt-1">{enemy.area}</p>

          <span
            className="text-xs px-3 py-1 rounded-full border mt-3 uppercase tracking-wide"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {enemy.type}
          </span>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed mb-5">
          {enemy.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-neutral-800 rounded-lg p-3 text-center">
            <p className="text-neutral-500 text-xs mb-1">Vida</p>
            <p className="text-stone-100 font-semibold">❤️ {enemy.health}</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3 text-center">
            <p className="text-neutral-500 text-xs mb-1">Daño</p>
            <p className="text-stone-100 font-semibold">⚔️ {enemy.damage}</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3 text-center">
            <p className="text-neutral-500 text-xs mb-1">Geo</p>
            <p className="text-stone-100 font-semibold">💰 {enemy.geoReward ?? 0}</p>
          </div>
          <div className="bg-neutral-800 rounded-lg p-3 text-center">
            <p className="text-neutral-500 text-xs mb-1">Boss fight</p>
            <p className="text-stone-100 font-semibold">{enemy.isBossFight ? 'Sí' : 'No'}</p>
          </div>
        </div>

        {enemy.acquiredAbility && (
          <div className="mt-4 text-center text-sm text-neutral-400">
            Habilidad obtenida:{' '}
            <span style={{ color: accentColor }}>{enemy.acquiredAbility}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnemyDetailModal;