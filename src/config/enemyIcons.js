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