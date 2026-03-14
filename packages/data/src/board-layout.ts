// Enochian Chess Board Layout
// 8x8 grid divided into four 4x4 quadrants (Watchtowers)
// Based on Zalewski's reconstruction and the Golden Dawn colour scales
//
// Board orientation (canonical):
//   Air (East)  quadrant: rows 0-3, cols 4-7
//   Water (West) quadrant: rows 0-3, cols 0-3
//   Fire (South) quadrant: rows 4-7, cols 0-3
//   Earth (North) quadrant: rows 4-7, cols 4-7
//
// Note: "North" in GD directional attribution maps to the top of the board

import { Element, SubElement, SquareData } from './types';

// Helper to create a square
function sq(
  row: number, col: number, quadrant: Element, subElement: SubElement,
  enochianLetter: string, kingScale: string, queenScale: string,
  spiritName: string, meaning: string,
): SquareData {
  const colLetter = String.fromCharCode(97 + col); // a-h
  const rowNum = 8 - row; // 1-8 from bottom
  return {
    id: `${colLetter}${rowNum}`,
    row, col, quadrant, enochianLetter, subElement,
    kingScaleColour: kingScale, queenScaleColour: queenScale,
    spiritName, divinatoryMeaning: meaning,
  };
}

// Water Quadrant (West) - rows 0-3, cols 0-3
// The Water Tablet of the Enochian system
const waterSquares: SquareData[] = [
  // Row 0 (top row of Water quadrant)
  sq(0, 0, Element.WATER, SubElement.AIR_OF_WATER,    'r', '#2563EB', '#FF8C00', 'Raagiosl',  'Emotional clarity through communication'),
  sq(0, 1, Element.WATER, SubElement.AIR_OF_WATER,    'a', '#4169E1', '#FFA500', 'Saiinov',   'Messages from the unconscious'),
  sq(0, 2, Element.WATER, SubElement.AIR_OF_WATER,    'c', '#1E90FF', '#FF7F50', 'Laoaxrp',   'Thoughts shaped by feeling'),
  sq(0, 3, Element.WATER, SubElement.AIR_OF_WATER,    'o', '#00BFFF', '#FF6347', 'Slgaiol',   'Intuitive understanding'),
  // Row 1
  sq(1, 0, Element.WATER, SubElement.WATER_OF_WATER,  'n', '#0000CD', '#FFD700', 'Ligdisa',   'Deep emotional currents'),
  sq(1, 1, Element.WATER, SubElement.WATER_OF_WATER,  'h', '#0000FF', '#FFFF00', 'Aaiibai',   'Reflection and receptivity'),
  sq(1, 2, Element.WATER, SubElement.WATER_OF_WATER,  'o', '#4682B4', '#FFA07A', 'Avtotar',   'Emotional transformation'),
  sq(1, 3, Element.WATER, SubElement.WATER_OF_WATER,  'd', '#5F9EA0', '#FF4500', 'Akaninr',   'Flow and surrender'),
  // Row 2
  sq(2, 0, Element.WATER, SubElement.EARTH_OF_WATER,  'p', '#191970', '#98FB98', 'Liiansa',   'Material manifestation of emotion'),
  sq(2, 1, Element.WATER, SubElement.EARTH_OF_WATER,  'a', '#000080', '#90EE90', 'Ahmlicv',   'Grounding feelings in reality'),
  sq(2, 2, Element.WATER, SubElement.EARTH_OF_WATER,  'c', '#00008B', '#7CFC00', 'Lhiansa',   'Practical compassion'),
  sq(2, 3, Element.WATER, SubElement.EARTH_OF_WATER,  'o', '#483D8B', '#32CD32', 'Ahozpi',    'Emotional stability'),
  // Row 3
  sq(3, 0, Element.WATER, SubElement.FIRE_OF_WATER,   'n', '#8B0000', '#87CEEB', 'Htmorda',   'Passionate feeling'),
  sq(3, 1, Element.WATER, SubElement.FIRE_OF_WATER,   'd', '#B22222', '#ADD8E6', 'Ahaozpi',   'Desire and longing'),
  sq(3, 2, Element.WATER, SubElement.FIRE_OF_WATER,   'i', '#CD5C5C', '#B0C4DE', 'Hipotga',   'Emotional willpower'),
  sq(3, 3, Element.WATER, SubElement.FIRE_OF_WATER,   'l', '#DC143C', '#6495ED', 'Avitoar',   'Transformation through feeling'),
];

// Air Quadrant (East) - rows 0-3, cols 4-7
// The Air Tablet of the Enochian system
const airSquares: SquareData[] = [
  // Row 0
  sq(0, 4, Element.AIR, SubElement.WATER_OF_AIR,    'r', '#FFD700', '#0000CD', 'Aozaif',    'Intellectual empathy'),
  sq(0, 5, Element.AIR, SubElement.WATER_OF_AIR,    'z', '#FFFF00', '#0000FF', 'Tnabr',     'Emotional intelligence'),
  sq(0, 6, Element.AIR, SubElement.WATER_OF_AIR,    'i', '#FFA500', '#4682B4', 'Oloag',     'Feelings expressed in thought'),
  sq(0, 7, Element.AIR, SubElement.WATER_OF_AIR,    'l', '#FF8C00', '#5F9EA0', 'Aabco',     'Reflective communication'),
  // Row 1
  sq(1, 4, Element.AIR, SubElement.AIR_OF_AIR,      'a', '#FFFACD', '#8B008B', 'Habioro',   'Pure thought and analysis'),
  sq(1, 5, Element.AIR, SubElement.AIR_OF_AIR,      'r', '#FAFAD2', '#9400D3', 'Aaoxaif',   'Clarity of mind'),
  sq(1, 6, Element.AIR, SubElement.AIR_OF_AIR,      'd', '#FFFFE0', '#9932CC', 'Htmorda',   'Abstract reasoning'),
  sq(1, 7, Element.AIR, SubElement.AIR_OF_AIR,      'o', '#F0E68C', '#8A2BE2', 'Ahaozpi',   'Communication and expression'),
  // Row 2
  sq(2, 4, Element.AIR, SubElement.FIRE_OF_AIR,     'i', '#FF4500', '#87CEEB', 'Avtotar',   'Inspired ideas'),
  sq(2, 5, Element.AIR, SubElement.FIRE_OF_AIR,     'd', '#FF6347', '#ADD8E6', 'Hipotga',   'Willful communication'),
  sq(2, 6, Element.AIR, SubElement.FIRE_OF_AIR,     'o', '#FF7F50', '#B0C4DE', 'Akaninr',   'Creative thought'),
  sq(2, 7, Element.AIR, SubElement.FIRE_OF_AIR,     'i', '#FF8C00', '#6495ED', 'Anodoin',   'Mental energy and drive'),
  // Row 3
  sq(3, 4, Element.AIR, SubElement.EARTH_OF_AIR,    'a', '#006400', '#FFD700', 'Aaetpio',   'Practical planning'),
  sq(3, 5, Element.AIR, SubElement.EARTH_OF_AIR,    'i', '#228B22', '#FFFF00', 'Adoeoet',   'Manifesting ideas'),
  sq(3, 6, Element.AIR, SubElement.EARTH_OF_AIR,    'p', '#2E8B57', '#FFA500', 'Anodoin',   'Structured thought'),
  sq(3, 7, Element.AIR, SubElement.EARTH_OF_AIR,    't', '#3CB371', '#FF8C00', 'Alndvod',   'Grounded communication'),
];

// Fire Quadrant (South) - rows 4-7, cols 0-3
// The Fire Tablet of the Enochian system
const fireSquares: SquareData[] = [
  // Row 4
  sq(4, 0, Element.FIRE, SubElement.AIR_OF_FIRE,    'r', '#FF0000', '#00FF00', 'Edlprnaa',  'Inspired action'),
  sq(4, 1, Element.FIRE, SubElement.AIR_OF_FIRE,    'd', '#FF4500', '#32CD32', 'Aanatapf',   'Strategic will'),
  sq(4, 2, Element.FIRE, SubElement.AIR_OF_FIRE,    'o', '#FF6347', '#7CFC00', 'Alhctga',   'Directed energy'),
  sq(4, 3, Element.FIRE, SubElement.AIR_OF_FIRE,    'i', '#FF7F50', '#90EE90', 'Ahmlicv',   'Clarity of purpose'),
  // Row 5
  sq(5, 0, Element.FIRE, SubElement.FIRE_OF_FIRE,   'a', '#8B0000', '#00FFFF', 'Aapdoce',   'Pure will and power'),
  sq(5, 1, Element.FIRE, SubElement.FIRE_OF_FIRE,   'n', '#B22222', '#00CED1', 'Anodoin',   'Creative force'),
  sq(5, 2, Element.FIRE, SubElement.FIRE_OF_FIRE,   'a', '#CD5C5C', '#20B2AA', 'Arinnap',   'Transformation through fire'),
  sq(5, 3, Element.FIRE, SubElement.FIRE_OF_FIRE,   'a', '#DC143C', '#48D1CC', 'Noalmr',    'Spiritual fire'),
  // Row 6
  sq(6, 0, Element.FIRE, SubElement.WATER_OF_FIRE,  'p', '#FF0000', '#0000FF', 'Rsonia',    'Passion and desire'),
  sq(6, 1, Element.FIRE, SubElement.WATER_OF_FIRE,  's', '#FF4500', '#1E90FF', 'Iznrzi',    'Emotional courage'),
  sq(6, 2, Element.FIRE, SubElement.WATER_OF_FIRE,  'o', '#DC143C', '#4169E1', 'Ommag',     'Deep passion'),
  sq(6, 3, Element.FIRE, SubElement.WATER_OF_FIRE,  'n', '#B22222', '#2563EB', 'Opmacas',   'Willful feeling'),
  // Row 7
  sq(7, 0, Element.FIRE, SubElement.EARTH_OF_FIRE,  'a', '#8B0000', '#228B22', 'Genadol',   'Manifested will'),
  sq(7, 1, Element.FIRE, SubElement.EARTH_OF_FIRE,  'c', '#800000', '#006400', 'Aspiaon',   'Physical energy'),
  sq(7, 2, Element.FIRE, SubElement.EARTH_OF_FIRE,  'a', '#660000', '#2E8B57', 'Noalmr',    'Material creation'),
  sq(7, 3, Element.FIRE, SubElement.EARTH_OF_FIRE,  'r', '#4B0000', '#3CB371', 'Volxdo',    'Grounded power'),
];

// Earth Quadrant (North) - rows 4-7, cols 4-7
// The Earth Tablet of the Enochian system
const earthSquares: SquareData[] = [
  // Row 4
  sq(4, 4, Element.EARTH, SubElement.FIRE_OF_EARTH,  'r', '#006400', '#FF0000', 'Abalpt',    'Material transformation'),
  sq(4, 5, Element.EARTH, SubElement.FIRE_OF_EARTH,  'a', '#228B22', '#FF4500', 'Arbiz',     'Physical energy'),
  sq(4, 6, Element.EARTH, SubElement.FIRE_OF_EARTH,  'i', '#2E8B57', '#FF6347', 'Opanib',    'Active manifestation'),
  sq(4, 7, Element.EARTH, SubElement.FIRE_OF_EARTH,  'l', '#3CB371', '#FF7F50', 'Rsoniz',    'Driven material growth'),
  // Row 5
  sq(5, 4, Element.EARTH, SubElement.EARTH_OF_EARTH, 'i', '#013220', '#FFD700', 'Iaaasd',    'Pure stability and form'),
  sq(5, 5, Element.EARTH, SubElement.EARTH_OF_EARTH, 'a', '#004225', '#FFA500', 'Atapa',     'Endurance and patience'),
  sq(5, 6, Element.EARTH, SubElement.EARTH_OF_EARTH, 'o', '#005C35', '#FF8C00', 'Aocaor',    'Material abundance'),
  sq(5, 7, Element.EARTH, SubElement.EARTH_OF_EARTH, 'n', '#007142', '#FFFF00', 'Amagol',    'Foundation and permanence'),
  // Row 6
  sq(6, 4, Element.EARTH, SubElement.WATER_OF_EARTH, 'b', '#004D40', '#1E90FF', 'Brap',      'Emotional groundedness'),
  sq(6, 5, Element.EARTH, SubElement.WATER_OF_EARTH, 'r', '#00695C', '#2563EB', 'Izxpiz',    'Material nurturing'),
  sq(6, 6, Element.EARTH, SubElement.WATER_OF_EARTH, 'i', '#00796B', '#4169E1', 'Stimcul',   'Practical empathy'),
  sq(6, 7, Element.EARTH, SubElement.WATER_OF_EARTH, 'l', '#00897B', '#0000FF', 'Docepax',   'Stable emotions'),
  // Row 7
  sq(7, 4, Element.EARTH, SubElement.AIR_OF_EARTH,   'p', '#1B5E20', '#FFD700', 'Angpoi',    'Practical wisdom'),
  sq(7, 5, Element.EARTH, SubElement.AIR_OF_EARTH,   'a', '#33691E', '#FFFF00', 'Unnax',     'Grounded thought'),
  sq(7, 6, Element.EARTH, SubElement.AIR_OF_EARTH,   'c', '#558B2F', '#FFA500', 'Maladi',    'Structured knowledge'),
  sq(7, 7, Element.EARTH, SubElement.AIR_OF_EARTH,   'o', '#689F38', '#FF8C00', 'Iasdvr',    'Practical learning'),
];

// Full board: 64 squares indexed by id
const allSquares = [...waterSquares, ...airSquares, ...fireSquares, ...earthSquares];

export const BOARD_SQUARES: Record<string, SquareData> = {};
for (const sq of allSquares) {
  BOARD_SQUARES[sq.id] = sq;
}

// Grid-indexed board for positional lookups
export const BOARD_GRID: (SquareData | null)[][] = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => null),
);
for (const sq of allSquares) {
  BOARD_GRID[sq.row][sq.col] = sq;
}

// Quadrant boundaries
export const QUADRANT_BOUNDS: Record<Element, { rowStart: number; rowEnd: number; colStart: number; colEnd: number }> = {
  [Element.WATER]: { rowStart: 0, rowEnd: 3, colStart: 0, colEnd: 3 },
  [Element.AIR]:   { rowStart: 0, rowEnd: 3, colStart: 4, colEnd: 7 },
  [Element.FIRE]:  { rowStart: 4, rowEnd: 7, colStart: 0, colEnd: 3 },
  [Element.EARTH]: { rowStart: 4, rowEnd: 7, colStart: 4, colEnd: 7 },
};

export function getSquareAt(row: number, col: number): SquareData | null {
  if (row < 0 || row > 7 || col < 0 || col > 7) return null;
  return BOARD_GRID[row][col];
}

export function getQuadrantSquares(element: Element): SquareData[] {
  return allSquares.filter(sq => sq.quadrant === element);
}

// Triangle element colors for traditional board design
// Each square is divided into 4 triangles in an X pattern (diagonals from corners)
// Returns [top, right, bottom, left] element colors
// The qualifying element (first part of sub-element) determines rotation

const ELEMENT_COLORS: Record<Element, string> = {
  [Element.FIRE]:  '#DC2626',
  [Element.WATER]: '#2563EB',
  [Element.AIR]:   '#EAB308',
  [Element.EARTH]: '#1A1A1A',
};

// Triangle arrangements: the qualifying element (X in X_OF_Y) goes to top,
// then the remaining elements rotate clockwise
const TRIANGLE_ROTATIONS: Record<Element, [Element, Element, Element, Element]> = {
  [Element.FIRE]:  [Element.FIRE, Element.WATER, Element.EARTH, Element.AIR],
  [Element.WATER]: [Element.WATER, Element.EARTH, Element.AIR, Element.FIRE],
  [Element.AIR]:   [Element.AIR, Element.FIRE, Element.WATER, Element.EARTH],
  [Element.EARTH]: [Element.EARTH, Element.AIR, Element.FIRE, Element.WATER],
};

export interface TriangleColors {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

/** Get the 4 triangle fill colors for a square based on its sub-element */
export function getTriangleColors(subElement: SubElement): TriangleColors {
  // Extract the qualifying element (first part: X in X_OF_Y)
  const qualifier = subElement.split('_OF_')[0] as Element;
  const [top, right, bottom, left] = TRIANGLE_ROTATIONS[qualifier];
  return {
    top: ELEMENT_COLORS[top],
    right: ELEMENT_COLORS[right],
    bottom: ELEMENT_COLORS[bottom],
    left: ELEMENT_COLORS[left],
  };
}

export { ELEMENT_COLORS as BOARD_ELEMENT_COLORS };
