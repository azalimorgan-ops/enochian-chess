// Divination reading engine
// Generates and interprets readings using the Enochian chess system

import { getDignity, getSquareAt } from '@enochian-chess/data';
import { GameState, Element, Piece, GameStatus } from '../types';
import { createNewGame, applyMove } from '../game';
import { findBestMove } from '../ai/minimax';
import { getKing } from '../board';

export interface PieceReading {
  piece: Piece;
  squareId: string;
  squareMeaning: string;
  pieceMeaning: string;
  combinedMeaning: string;
  dignityModifier: string;
}

export interface DignityInteraction {
  piece1Id: string;
  piece2Id: string;
  relation: string;
  interpretation: string;
}

export interface DivinationReading {
  id: string;
  timestamp: number;
  query: string;
  queryElement: Element;
  significatorId: string;
  finalState: GameState;
  pieceReadings: PieceReading[];
  dignityInteractions: DignityInteraction[];
  summary: string;
  saved: boolean;
}

// Run a full automated game reading (AI vs AI)
export function generateAutomatedReading(
  query: string,
  queryElement: Element,
): DivinationReading {
  let state = createNewGame(queryElement, 'DIVINATION', query);
  const maxTurns = 200; // Safety limit

  // Run game to completion
  let turns = 0;
  while (state.status === GameStatus.IN_PROGRESS && turns < maxTurns) {
    const move = findBestMove(state, { maxDepth: 2, timeLimit: 1000 });
    if (!move) break;

    try {
      state = applyMove(state, move.pieceId, move.to);
    } catch {
      break;
    }
    turns++;
  }

  // Find significator (the king of the query element)
  const significator = getKing(state.pieces, queryElement);

  // Generate piece readings for all active pieces
  const pieceReadings = generatePieceReadings(state);

  // Generate dignity interactions
  const dignityInteractions = generateDignityInteractions(state);

  // Compose summary
  const summary = composeSummary(query, queryElement, pieceReadings, dignityInteractions, state);

  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    query,
    queryElement,
    significatorId: significator?.id ?? '',
    finalState: state,
    pieceReadings,
    dignityInteractions,
    summary,
    saved: false,
  };
}

function generatePieceReadings(state: GameState): PieceReading[] {
  const readings: PieceReading[] = [];

  for (const piece of state.pieces) {
    if (piece.isCaptured) continue;

    const square = getSquareAt(piece.position.row, piece.position.col);
    if (!square) continue;

    const dignity = getDignity(piece.template.element, square.quadrant);
    const isModified = dignity === 'HOSTILE' || dignity === 'MIXED';

    const pieceMeaning = isModified
      ? piece.template.divinatoryMeaning.modified
      : piece.template.divinatoryMeaning.upright;

    readings.push({
      piece,
      squareId: square.id,
      squareMeaning: square.divinatoryMeaning,
      pieceMeaning,
      combinedMeaning: `${piece.template.godForm} on ${square.id}: ${pieceMeaning} The square adds the influence of ${square.divinatoryMeaning.toLowerCase()}.`,
      dignityModifier: dignity,
    });
  }

  return readings;
}

function generateDignityInteractions(state: GameState): DignityInteraction[] {
  const interactions: DignityInteraction[] = [];
  const activePieces = state.pieces.filter(p => !p.isCaptured);

  // Check adjacent pieces for dignity interactions
  for (let i = 0; i < activePieces.length; i++) {
    for (let j = i + 1; j < activePieces.length; j++) {
      const p1 = activePieces[i];
      const p2 = activePieces[j];

      // Only consider pieces within 2 squares of each other
      const distance = Math.max(
        Math.abs(p1.position.row - p2.position.row),
        Math.abs(p1.position.col - p2.position.col),
      );
      if (distance > 2) continue;

      const relation = getDignity(p1.template.element, p2.template.element);
      if (relation === 'NEUTRAL') continue;

      const relationText = relation === 'FRIENDLY' ? 'strengthen each other'
        : relation === 'HOSTILE' ? 'oppose each other'
        : 'partially modify each other';

      interactions.push({
        piece1Id: p1.id,
        piece2Id: p2.id,
        relation,
        interpretation: `${p1.template.godForm} (${p1.template.element}) and ${p2.template.godForm} (${p2.template.element}) ${relationText}. Their proximity ${relation === 'FRIENDLY' ? 'amplifies' : relation === 'HOSTILE' ? 'diminishes' : 'complicates'} both influences.`,
      });
    }
  }

  return interactions;
}

function composeSummary(
  query: string,
  queryElement: Element,
  readings: PieceReading[],
  interactions: DignityInteraction[],
  state: GameState,
): string {
  const elementDescriptions: Record<Element, string> = {
    [Element.FIRE]: 'will, action, and creative power',
    [Element.WATER]: 'emotion, intuition, and the unconscious',
    [Element.AIR]: 'thought, communication, and intellect',
    [Element.EARTH]: 'material reality, practical matters, and the body',
  };

  const friendlyCount = interactions.filter(i => i.relation === 'FRIENDLY').length;
  const hostileCount = interactions.filter(i => i.relation === 'HOSTILE').length;

  const overallTone = friendlyCount > hostileCount
    ? 'The elemental forces are largely harmonious, suggesting a favourable outcome through cooperation and alignment.'
    : hostileCount > friendlyCount
    ? 'There is significant elemental tension in this reading, indicating challenges that require careful navigation and adaptation.'
    : 'The elemental forces are balanced between harmony and tension, suggesting a situation in flux that could move in either direction.';

  const capturedCount = state.pieces.filter(p => p.isCaptured).length;
  const captureNote = capturedCount > 8
    ? 'The significant number of captured pieces indicates a period of major transformation and release.'
    : capturedCount > 4
    ? 'Several captures suggest moderate change and the clearing away of old patterns.'
    : 'Few captures indicate stability, with most forces remaining in play.';

  return `Reading for the question of ${elementDescriptions[queryElement]}: "${query}"\n\n${overallTone}\n\n${captureNote}\n\nThe reading shows ${readings.length} active pieces across the board, with ${interactions.length} significant elemental interactions between nearby pieces. The ${queryElement} significator\'s position and dignity relationships are central to the interpretation.`;
}
