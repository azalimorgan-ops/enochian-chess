// Minimax with alpha-beta pruning for four-player Enochian Chess
// Adapted for the alliance system: maximize for own team, minimize for opponents

import { areAllied, getTeamOf, getOpposingTeam } from '@enochian-chess/data';
import { GameState, Move, Position, Element, GameStatus } from '../types';
import { getLegalMoves } from '../rules';
import { applyMove } from '../game';
import { evaluateBoard } from './evaluate';

export interface AIConfig {
  maxDepth: number;
  timeLimit: number; // ms
}

const DEFAULT_CONFIG: AIConfig = {
  maxDepth: 3,
  timeLimit: 5000,
};

export function findBestMove(state: GameState, config: AIConfig = DEFAULT_CONFIG): Move | null {
  const currentElement = state.currentTurn;
  const team = getTeamOf(state.concourse, currentElement);
  const startTime = Date.now();

  let bestMove: Move | null = null;
  let bestScore = -Infinity;

  // Generate all legal moves for the current player
  const pieces = state.pieces.filter(
    p => !p.isCaptured && !p.isInert && p.template.element === currentElement,
  );

  for (const piece of pieces) {
    const legalMoves = getLegalMoves(piece, state);

    for (const target of legalMoves) {
      // Check time limit
      if (Date.now() - startTime > config.timeLimit) {
        return bestMove;
      }

      try {
        const newState = applyMove(state, piece.id, target);
        const score = minimax(
          newState,
          config.maxDepth - 1,
          -Infinity,
          Infinity,
          team,
          startTime,
          config.timeLimit,
        );

        if (score > bestScore) {
          bestScore = score;
          bestMove = {
            pieceId: piece.id,
            from: { ...piece.position },
            to: { ...target },
          };
        }
      } catch {
        // Skip invalid moves
        continue;
      }
    }
  }

  return bestMove;
}

function minimax(
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  forTeam: [Element, Element],
  startTime: number,
  timeLimit: number,
): number {
  // Terminal conditions
  if (depth <= 0 || state.status !== GameStatus.IN_PROGRESS) {
    return evaluateBoard(state, forTeam);
  }

  // Time check
  if (Date.now() - startTime > timeLimit) {
    return evaluateBoard(state, forTeam);
  }

  const isMaximizing = forTeam.includes(state.currentTurn);
  const pieces = state.pieces.filter(
    p => !p.isCaptured && !p.isInert && p.template.element === state.currentTurn,
  );

  if (isMaximizing) {
    let maxEval = -Infinity;

    for (const piece of pieces) {
      const legalMoves = getLegalMoves(piece, state);
      for (const target of legalMoves) {
        try {
          const newState = applyMove(state, piece.id, target);
          const evalScore = minimax(newState, depth - 1, alpha, beta, forTeam, startTime, timeLimit);
          maxEval = Math.max(maxEval, evalScore);
          alpha = Math.max(alpha, evalScore);
          if (beta <= alpha) break;
        } catch {
          continue;
        }
      }
      if (beta <= alpha) break;
    }

    return maxEval === -Infinity ? evaluateBoard(state, forTeam) : maxEval;
  } else {
    let minEval = Infinity;

    for (const piece of pieces) {
      const legalMoves = getLegalMoves(piece, state);
      for (const target of legalMoves) {
        try {
          const newState = applyMove(state, piece.id, target);
          const evalScore = minimax(newState, depth - 1, alpha, beta, forTeam, startTime, timeLimit);
          minEval = Math.min(minEval, evalScore);
          beta = Math.min(beta, evalScore);
          if (beta <= alpha) break;
        } catch {
          continue;
        }
      }
      if (beta <= alpha) break;
    }

    return minEval === Infinity ? evaluateBoard(state, forTeam) : minEval;
  }
}
