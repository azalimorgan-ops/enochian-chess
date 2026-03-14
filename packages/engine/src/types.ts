// Runtime game types for the Enochian Chess engine

import { Element, PieceType } from '@enochian-chess/data';

// Redeclare these interfaces locally to avoid Turbopack type-only export issues
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

export interface Position {
  row: number;
  col: number;
}

export interface Piece {
  id: string;
  template: PieceTemplate;
  position: Position;
  isCaptured: boolean;
  isInert: boolean; // true when owner's king is checkmated
}

export interface Move {
  pieceId: string;
  from: Position;
  to: Position;
  capturedPieceId?: string;
  notation?: string;
}

export enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  TEAM1_WINS = 'TEAM1_WINS',
  TEAM2_WINS = 'TEAM2_WINS',
  STALEMATE = 'STALEMATE',
}

export interface CheckState {
  [Element.FIRE]: { inCheck: boolean; checkmated: boolean };
  [Element.WATER]: { inCheck: boolean; checkmated: boolean };
  [Element.AIR]: { inCheck: boolean; checkmated: boolean };
  [Element.EARTH]: { inCheck: boolean; checkmated: boolean };
}

export interface GameState {
  pieces: Piece[];
  currentTurn: Element;
  turnOrder: Element[];
  turnNumber: number;
  concourse: ConcourseConfig;
  moveHistory: Move[];
  checkState: CheckState;
  status: GameStatus;
  mode: 'GAME' | 'DIVINATION';
  query?: string;
}

export { Element, PieceType };
