// Board utilities — piece placement, position lookups, coordinate conversion

import { ALL_PIECE_TEMPLATES, getSquareAt } from '@enochian-chess/data';
import { Piece, Position, Element } from './types';

export function createInitialPieces(): Piece[] {
  return ALL_PIECE_TEMPLATES.map((template, index) => ({
    id: `${template.element.toLowerCase()}-${template.type.toLowerCase()}-${index}`,
    template,
    position: { ...template.startingPosition },
    isCaptured: false,
    isInert: false,
  }));
}

export function getPieceAt(pieces: Piece[], pos: Position): Piece | undefined {
  return pieces.find(
    p => !p.isCaptured && p.position.row === pos.row && p.position.col === pos.col,
  );
}

export function getPiecesForElement(pieces: Piece[], element: Element): Piece[] {
  return pieces.filter(p => !p.isCaptured && p.template.element === element);
}

export function getKing(pieces: Piece[], element: Element): Piece | undefined {
  return pieces.find(
    p => !p.isCaptured && p.template.element === element && p.template.type === 'KING',
  );
}

export function isWithinBounds(pos: Position): boolean {
  return pos.row >= 0 && pos.row <= 7 && pos.col >= 0 && pos.col <= 7;
}

export function positionToId(pos: Position): string {
  const colLetter = String.fromCharCode(97 + pos.col);
  const rowNum = 8 - pos.row;
  return `${colLetter}${rowNum}`;
}

export function idToPosition(id: string): Position {
  const col = id.charCodeAt(0) - 97;
  const row = 8 - parseInt(id[1], 10);
  return { row, col };
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

export function getSquareInfo(pos: Position) {
  return getSquareAt(pos.row, pos.col);
}
