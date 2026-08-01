export const defaultTheme = {
  bg: 'radial-gradient(circle at 50% 0%, #1c1c1e 0%, #0a0a0b 60%)',
  accent: '#67e8f9', // cian, tono "alma"
  accentSoft: 'rgba(103, 232, 249, 0.15)',
};

export const areaThemes = {
  'Forgotten Crossroads': {
    bg: 'radial-gradient(circle at 50% 0%, #2b2f36 0%, #0d0f12 60%)',
    accent: '#93a3b3',
    accentSoft: 'rgba(147, 163, 179, 0.15)',
  },
  Greenpath: {
    bg: 'radial-gradient(circle at 50% 0%, #16351f 0%, #06120a 60%)',
    accent: '#4ade80',
    accentSoft: 'rgba(74, 222, 128, 0.15)',
  },
  'Fungal Wastes': {
    bg: 'radial-gradient(circle at 50% 0%, #3a2e14 0%, #14100a 60%)',
    accent: '#facc15',
    accentSoft: 'rgba(250, 204, 21, 0.15)',
  },
  'City of Tears': {
    bg: 'radial-gradient(circle at 50% 0%, #0f2a3d 0%, #050d13 60%)',
    accent: '#38bdf8',
    accentSoft: 'rgba(56, 189, 248, 0.15)',
  },
  'Crystal Peak': {
    bg: 'radial-gradient(circle at 50% 0%, #3a1530 0%, #150810 60%)',
    accent: '#f472b6',
    accentSoft: 'rgba(244, 114, 182, 0.15)',
  },
  'Royal Waterways': {
    bg: 'radial-gradient(circle at 50% 0%, #332911 0%, #100c05 60%)',
    accent: '#a3822f',
    accentSoft: 'rgba(163, 130, 47, 0.15)',
  },
  Deepnest: {
    bg: 'radial-gradient(circle at 50% 0%, #2a0f0f 0%, #0c0404 60%)',
    accent: '#f87171',
    accentSoft: 'rgba(248, 113, 113, 0.15)',
  },
  "Queen's Gardens": {
    bg: 'radial-gradient(circle at 50% 0%, #341b3d 0%, #120814 60%)',
    accent: '#c084fc',
    accentSoft: 'rgba(192, 132, 252, 0.15)',
  },
  'Fog Canyon': {
    bg: 'radial-gradient(circle at 50% 0%, #123539 0%, #051012 60%)',
    accent: '#5eead4',
    accentSoft: 'rgba(94, 234, 212, 0.15)',
  },
  "Kingdom's Edge": {
    bg: 'radial-gradient(circle at 50% 0%, #3a1c10 0%, #140a05 60%)',
    accent: '#fb923c',
    accentSoft: 'rgba(251, 146, 60, 0.15)',
  },
  'The Hive': {
    bg: 'radial-gradient(circle at 50% 0%, #3d2e08 0%, #141002 60%)',
    accent: '#fbbf24',
    accentSoft: 'rgba(251, 191, 36, 0.15)',
  },
  'Ancient Basin': {
    bg: 'radial-gradient(circle at 50% 0%, #1e1533 0%, #0a0712 60%)',
    accent: '#a78bfa',
    accentSoft: 'rgba(167, 139, 250, 0.15)',
  },
  'The Abyss': {
    bg: 'radial-gradient(circle at 50% 0%, #12081f 0%, #030105 60%)',
    accent: '#7c3aed',
    accentSoft: 'rgba(124, 58, 237, 0.15)',
  },
  'White Palace': {
    bg: 'radial-gradient(circle at 50% 0%, #3a3a3a 0%, #17171a 60%)',
    accent: '#f5f5f4',
    accentSoft: 'rgba(245, 245, 244, 0.15)',
  },
};

export function getTheme(area) {
  return areaThemes[area] || defaultTheme;
}