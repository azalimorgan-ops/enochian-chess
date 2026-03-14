// Core types for the Enochian Chess system

export enum Element {
  FIRE = 'FIRE',
  WATER = 'WATER',
  AIR = 'AIR',
  EARTH = 'EARTH',
}

export enum SubElement {
  FIRE_OF_FIRE = 'FIRE_OF_FIRE',
  WATER_OF_FIRE = 'WATER_OF_FIRE',
  AIR_OF_FIRE = 'AIR_OF_FIRE',
  EARTH_OF_FIRE = 'EARTH_OF_FIRE',
  FIRE_OF_WATER = 'FIRE_OF_WATER',
  WATER_OF_WATER = 'WATER_OF_WATER',
  AIR_OF_WATER = 'AIR_OF_WATER',
  EARTH_OF_WATER = 'EARTH_OF_WATER',
  FIRE_OF_AIR = 'FIRE_OF_AIR',
  WATER_OF_AIR = 'WATER_OF_AIR',
  AIR_OF_AIR = 'AIR_OF_AIR',
  EARTH_OF_AIR = 'EARTH_OF_AIR',
  FIRE_OF_EARTH = 'FIRE_OF_EARTH',
  WATER_OF_EARTH = 'WATER_OF_EARTH',
  AIR_OF_EARTH = 'AIR_OF_EARTH',
  EARTH_OF_EARTH = 'EARTH_OF_EARTH',
}

export enum PieceType {
  KING = 'KING',
  QUEEN = 'QUEEN',
  BISHOP = 'BISHOP',
  KNIGHT = 'KNIGHT',
  ROOK = 'ROOK',
  PAWN = 'PAWN',
}

export enum DignityRelation {
  FRIENDLY = 'FRIENDLY',
  HOSTILE = 'HOSTILE',
  NEUTRAL = 'NEUTRAL',
  MIXED = 'MIXED',
}

export interface SquareData {
  id: string;
  row: number;
  col: number;
  quadrant: Element;
  enochianLetter: string;
  subElement: SubElement;
  kingScaleColour: string;
  queenScaleColour: string;
  spiritName: string;
  divinatoryMeaning: string;
}

export interface PieceTemplate {
  type: PieceType;
  element: Element;
  godForm: string;
  godFormAlternate: string;
  planetaryAttrib: string;
  zodiacalAttrib: string | null;
  divinatoryMeaning: {
    upright: string;
    modified: string;
  };
  startingPosition: { row: number; col: number };
}

export interface ConcourseConfig {
  openingElement: Element;
  turnOrder: Element[];
  team1: [Element, Element];
  team2: [Element, Element];
}
