// Shared design tokens for Enochian Chess

export const ELEMENT_COLOURS = {
  FIRE: { primary: '#DC2626', secondary: '#FCA5A5', bg: '#7F1D1D' },
  WATER: { primary: '#2563EB', secondary: '#93C5FD', bg: '#1E3A5F' },
  AIR: { primary: '#EAB308', secondary: '#FDE68A', bg: '#713F12' },
  EARTH: { primary: '#16A34A', secondary: '#86EFAC', bg: '#14532D' },
} as const;

export const COLOURS = {
  gold: '#D4AF37',
  goldLight: '#F5E6A3',
  goldDark: '#B8860B',
  bg: '#0F0F0F',
  bgCard: '#1A1A1A',
  bgElevated: '#252525',
  text: '#E5E5E5',
  textMuted: '#A3A3A3',
  border: '#333333',
} as const;

export const FONTS = {
  heading: 'Cinzel, serif',
  body: 'Inter, sans-serif',
} as const;
