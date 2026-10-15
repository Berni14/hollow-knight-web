import { createElement } from 'react';
import { Bug, ShieldAlert, Skull, Eye } from 'lucide-react';

export const typeIcons = {
  normal: Bug,
  'mini-boss': ShieldAlert,
  boss: Skull,
  hidden: Eye,
};

export function getIcon(type) {
  return typeIcons[type] || Bug;
}

// Icono del tipo de enemigo como componente estable (evita crear componentes durante el render)
export function EnemyTypeIcon({ type, ...props }) {
  return createElement(getIcon(type), props);
}
