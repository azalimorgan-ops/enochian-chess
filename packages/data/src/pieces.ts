// Enochian Chess Piece Definitions
// Based on the Golden Dawn system as reconstructed by Zalewski
//
// Each army has: 1 King, 1 Queen, 1 Bishop, 1 Knight, 1 Rook, 4 Pawns
// Egyptian god-form attributions follow the GD manuscripts

import { Element, PieceType, PieceTemplate } from './types';

// Starting positions follow the Zalewski reconstruction:
// Each army occupies its 4x4 quadrant home territory
// Royals on the back rank, pawns in front

// FIRE ARMY (South quadrant, rows 4-7, cols 0-3)
// Fire pieces face northward
const firePieces: PieceTemplate[] = [
  {
    type: PieceType.KING,
    element: Element.FIRE,
    godForm: 'Osiris',
    godFormAlternate: 'Ptah',
    planetaryAttrib: 'Sol',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Authority, leadership, creative power, the divine masculine. The ruler who shapes reality through will.',
      modified: 'Tyranny, ego inflation, burnout. Power without wisdom.',
    },
    startingPosition: { row: 7, col: 1 },
  },
  {
    type: PieceType.QUEEN,
    element: Element.FIRE,
    godForm: 'Isis',
    godFormAlternate: 'Nephthys',
    planetaryAttrib: 'Luna',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Intuition, receptivity, hidden knowledge, the divine feminine. Wisdom that comes through feeling.',
      modified: 'Illusion, deception, emotional manipulation. The moon that obscures rather than illuminates.',
    },
    startingPosition: { row: 7, col: 2 },
  },
  {
    type: PieceType.BISHOP,
    element: Element.FIRE,
    godForm: 'Horus',
    godFormAlternate: 'Aroueris',
    planetaryAttrib: 'Fire of Fire',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Pure elemental force, spiritual warfare, the avenging child. Direct confrontation with obstacles.',
      modified: 'Reckless aggression, destruction without purpose. Force misapplied.',
    },
    startingPosition: { row: 7, col: 0 },
  },
  {
    type: PieceType.KNIGHT,
    element: Element.FIRE,
    godForm: 'Typhon',
    godFormAlternate: 'Set',
    planetaryAttrib: 'Mars',
    zodiacalAttrib: 'Scorpio',
    divinatoryMeaning: {
      upright: 'Sudden change, disruption of stagnation, necessary chaos. The storm that clears the way.',
      modified: 'Violence, treachery, malice. Destruction for its own sake.',
    },
    startingPosition: { row: 7, col: 3 },
  },
  {
    type: PieceType.ROOK,
    element: Element.FIRE,
    godForm: 'Canopic Jar',
    godFormAlternate: 'Amset',
    planetaryAttrib: 'Jupiter',
    zodiacalAttrib: 'Sagittarius',
    divinatoryMeaning: {
      upright: 'Protection, containment of sacred energy, preservation. The vessel that holds what matters.',
      modified: 'Rigidity, inability to release, hoarding. Containment becomes imprisonment.',
    },
    startingPosition: { row: 6, col: 0 },
  },
  // Fire Pawns (Children/Sons of Fire)
  {
    type: PieceType.PAWN,
    element: Element.FIRE,
    godForm: 'Child of Fire',
    godFormAlternate: 'Son of Flame',
    planetaryAttrib: 'Sub-elemental',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New beginnings in action, a spark of inspiration, youthful energy directed toward a goal.',
      modified: 'Impulsiveness, scattered energy, projects begun but not completed.',
    },
    startingPosition: { row: 6, col: 1 },
  },
  {
    type: PieceType.PAWN,
    element: Element.FIRE,
    godForm: 'Child of Fire',
    godFormAlternate: 'Son of Flame',
    planetaryAttrib: 'Sub-elemental',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New beginnings in action, a spark of inspiration, youthful energy directed toward a goal.',
      modified: 'Impulsiveness, scattered energy, projects begun but not completed.',
    },
    startingPosition: { row: 6, col: 2 },
  },
  {
    type: PieceType.PAWN,
    element: Element.FIRE,
    godForm: 'Child of Fire',
    godFormAlternate: 'Son of Flame',
    planetaryAttrib: 'Sub-elemental',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New beginnings in action, a spark of inspiration, youthful energy directed toward a goal.',
      modified: 'Impulsiveness, scattered energy, projects begun but not completed.',
    },
    startingPosition: { row: 6, col: 3 },
  },
  {
    type: PieceType.PAWN,
    element: Element.FIRE,
    godForm: 'Child of Fire',
    godFormAlternate: 'Son of Flame',
    planetaryAttrib: 'Sub-elemental',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New beginnings in action, a spark of inspiration, youthful energy directed toward a goal.',
      modified: 'Impulsiveness, scattered energy, projects begun but not completed.',
    },
    startingPosition: { row: 5, col: 0 },
  },
];

// WATER ARMY (West quadrant, rows 0-3, cols 0-3)
// Water pieces face eastward
const waterPieces: PieceTemplate[] = [
  {
    type: PieceType.KING,
    element: Element.WATER,
    godForm: 'Osiris',
    godFormAlternate: 'Ptah',
    planetaryAttrib: 'Sol',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Emotional mastery, compassionate authority, wisdom through feeling. The ruler of the inner world.',
      modified: 'Emotional overwhelm, inability to act, paralysis through excess feeling.',
    },
    startingPosition: { row: 1, col: 0 },
  },
  {
    type: PieceType.QUEEN,
    element: Element.WATER,
    godForm: 'Isis',
    godFormAlternate: 'Nephthys',
    planetaryAttrib: 'Luna',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Deep intuition, psychic sensitivity, the mysteries revealed. Dreams and visions made manifest.',
      modified: 'Delusion, emotional instability, lost in the unconscious. Drowning in feeling.',
    },
    startingPosition: { row: 2, col: 0 },
  },
  {
    type: PieceType.BISHOP,
    element: Element.WATER,
    godForm: 'Horus',
    godFormAlternate: 'Aroueris',
    planetaryAttrib: 'Water of Water',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Emotional depth, spiritual purification, the healing waters. Cleansing and renewal.',
      modified: 'Emotional flooding, inability to set boundaries. Overwhelmed by the depths.',
    },
    startingPosition: { row: 0, col: 0 },
  },
  {
    type: PieceType.KNIGHT,
    element: Element.WATER,
    godForm: 'Typhon',
    godFormAlternate: 'Set',
    planetaryAttrib: 'Venus',
    zodiacalAttrib: 'Pisces',
    divinatoryMeaning: {
      upright: 'Unexpected emotional connections, creative inspiration from the unconscious, romantic surprise.',
      modified: 'Emotional chaos, deceptive attractions, seduction that leads astray.',
    },
    startingPosition: { row: 3, col: 0 },
  },
  {
    type: PieceType.ROOK,
    element: Element.WATER,
    godForm: 'Canopic Jar',
    godFormAlternate: 'Qebhsennuf',
    planetaryAttrib: 'Saturn',
    zodiacalAttrib: 'Aquarius',
    divinatoryMeaning: {
      upright: 'Emotional boundaries, structured feeling, the container for grief and joy alike.',
      modified: 'Emotional repression, frozen feelings, inability to express or release.',
    },
    startingPosition: { row: 0, col: 1 },
  },
  // Water Pawns
  {
    type: PieceType.PAWN, element: Element.WATER,
    godForm: 'Child of Water', godFormAlternate: 'Son of Waves',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Emerging feelings, first stirrings of love or compassion, emotional openness.',
      modified: 'Moodiness, emotional immaturity, small hurts amplified.',
    },
    startingPosition: { row: 1, col: 1 },
  },
  {
    type: PieceType.PAWN, element: Element.WATER,
    godForm: 'Child of Water', godFormAlternate: 'Son of Waves',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Emerging feelings, first stirrings of love or compassion, emotional openness.',
      modified: 'Moodiness, emotional immaturity, small hurts amplified.',
    },
    startingPosition: { row: 2, col: 1 },
  },
  {
    type: PieceType.PAWN, element: Element.WATER,
    godForm: 'Child of Water', godFormAlternate: 'Son of Waves',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Emerging feelings, first stirrings of love or compassion, emotional openness.',
      modified: 'Moodiness, emotional immaturity, small hurts amplified.',
    },
    startingPosition: { row: 3, col: 1 },
  },
  {
    type: PieceType.PAWN, element: Element.WATER,
    godForm: 'Child of Water', godFormAlternate: 'Son of Waves',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Emerging feelings, first stirrings of love or compassion, emotional openness.',
      modified: 'Moodiness, emotional immaturity, small hurts amplified.',
    },
    startingPosition: { row: 0, col: 2 },
  },
];

// AIR ARMY (East quadrant, rows 0-3, cols 4-7)
// Air pieces face westward
const airPieces: PieceTemplate[] = [
  {
    type: PieceType.KING,
    element: Element.AIR,
    godForm: 'Osiris',
    godFormAlternate: 'Ptah',
    planetaryAttrib: 'Sol',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Intellectual authority, clarity of thought, the power of the spoken word. Truth proclaimed.',
      modified: 'Cold rationality, intellectual arrogance, words as weapons. Logic without heart.',
    },
    startingPosition: { row: 1, col: 7 },
  },
  {
    type: PieceType.QUEEN,
    element: Element.AIR,
    godForm: 'Isis',
    godFormAlternate: 'Nephthys',
    planetaryAttrib: 'Luna',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Wisdom through contemplation, the mind that listens, subtle understanding. Knowledge received.',
      modified: 'Scattered thoughts, indecision, mental fog. Too many ideas, no direction.',
    },
    startingPosition: { row: 2, col: 7 },
  },
  {
    type: PieceType.BISHOP,
    element: Element.AIR,
    godForm: 'Horus',
    godFormAlternate: 'Aroueris',
    planetaryAttrib: 'Air of Air',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Pure intellect, penetrating analysis, the sword of discrimination. Cutting through illusion.',
      modified: 'Over-analysis, mental cruelty, cutting words. The mind that dissects but cannot feel.',
    },
    startingPosition: { row: 0, col: 7 },
  },
  {
    type: PieceType.KNIGHT,
    element: Element.AIR,
    godForm: 'Typhon',
    godFormAlternate: 'Set',
    planetaryAttrib: 'Mercury',
    zodiacalAttrib: 'Gemini',
    divinatoryMeaning: {
      upright: 'Sudden insight, paradigm shift, the lightning flash of understanding. Ideas that transform.',
      modified: 'Mental instability, trickery, deceptive communication. Cleverness without substance.',
    },
    startingPosition: { row: 3, col: 7 },
  },
  {
    type: PieceType.ROOK,
    element: Element.AIR,
    godForm: 'Canopic Jar',
    godFormAlternate: 'Tuamautef',
    planetaryAttrib: 'Moon',
    zodiacalAttrib: 'Cancer',
    divinatoryMeaning: {
      upright: 'Structured knowledge, the library, preserved wisdom. Ideas given form and protection.',
      modified: 'Dogma, closed-mindedness, knowledge hoarded rather than shared.',
    },
    startingPosition: { row: 0, col: 6 },
  },
  // Air Pawns
  {
    type: PieceType.PAWN, element: Element.AIR,
    godForm: 'Child of Air', godFormAlternate: 'Son of Winds',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New ideas, fresh perspectives, curiosity. The first question that leads to understanding.',
      modified: 'Gossip, superficiality, ideas without depth or follow-through.',
    },
    startingPosition: { row: 1, col: 6 },
  },
  {
    type: PieceType.PAWN, element: Element.AIR,
    godForm: 'Child of Air', godFormAlternate: 'Son of Winds',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New ideas, fresh perspectives, curiosity. The first question that leads to understanding.',
      modified: 'Gossip, superficiality, ideas without depth or follow-through.',
    },
    startingPosition: { row: 2, col: 6 },
  },
  {
    type: PieceType.PAWN, element: Element.AIR,
    godForm: 'Child of Air', godFormAlternate: 'Son of Winds',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New ideas, fresh perspectives, curiosity. The first question that leads to understanding.',
      modified: 'Gossip, superficiality, ideas without depth or follow-through.',
    },
    startingPosition: { row: 3, col: 6 },
  },
  {
    type: PieceType.PAWN, element: Element.AIR,
    godForm: 'Child of Air', godFormAlternate: 'Son of Winds',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'New ideas, fresh perspectives, curiosity. The first question that leads to understanding.',
      modified: 'Gossip, superficiality, ideas without depth or follow-through.',
    },
    startingPosition: { row: 0, col: 5 },
  },
];

// EARTH ARMY (North quadrant, rows 4-7, cols 4-7)
// Earth pieces face southward
const earthPieces: PieceTemplate[] = [
  {
    type: PieceType.KING,
    element: Element.EARTH,
    godForm: 'Osiris',
    godFormAlternate: 'Ptah',
    planetaryAttrib: 'Sol',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Material mastery, practical wisdom, abundance rightly earned. The builder and sustainer.',
      modified: 'Greed, materialism, stagnation. Power used only for accumulation.',
    },
    startingPosition: { row: 4, col: 6 },
  },
  {
    type: PieceType.QUEEN,
    element: Element.EARTH,
    godForm: 'Isis',
    godFormAlternate: 'Nephthys',
    planetaryAttrib: 'Luna',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Fertility, growth, the nurturing earth. Material provision and physical well-being.',
      modified: 'Possessiveness, smothering, over-attachment to material security.',
    },
    startingPosition: { row: 4, col: 5 },
  },
  {
    type: PieceType.BISHOP,
    element: Element.EARTH,
    godForm: 'Horus',
    godFormAlternate: 'Aroueris',
    planetaryAttrib: 'Earth of Earth',
    zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Solid foundation, enduring structures, the mountain. Unshakeable stability.',
      modified: 'Immovability, stubbornness, resistance to all change. Petrification.',
    },
    startingPosition: { row: 4, col: 7 },
  },
  {
    type: PieceType.KNIGHT,
    element: Element.EARTH,
    godForm: 'Typhon',
    godFormAlternate: 'Set',
    planetaryAttrib: 'Saturn',
    zodiacalAttrib: 'Capricorn',
    divinatoryMeaning: {
      upright: 'Unexpected material change, earthquake, disruption of the established. Necessary upheaval.',
      modified: 'Financial ruin, physical danger, the ground giving way beneath you.',
    },
    startingPosition: { row: 4, col: 4 },
  },
  {
    type: PieceType.ROOK,
    element: Element.EARTH,
    godForm: 'Canopic Jar',
    godFormAlternate: 'Hapi',
    planetaryAttrib: 'Venus',
    zodiacalAttrib: 'Taurus',
    divinatoryMeaning: {
      upright: 'Material security, the stronghold, resources well-managed. Wealth preserved.',
      modified: 'Fortress mentality, isolation through wealth, golden cage.',
    },
    startingPosition: { row: 5, col: 7 },
  },
  // Earth Pawns
  {
    type: PieceType.PAWN, element: Element.EARTH,
    godForm: 'Child of Earth', godFormAlternate: 'Son of Stone',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Small gains, seeds planted, the beginning of material endeavour. Patient growth.',
      modified: 'Delays, small losses, effort without visible reward. Stunted growth.',
    },
    startingPosition: { row: 5, col: 4 },
  },
  {
    type: PieceType.PAWN, element: Element.EARTH,
    godForm: 'Child of Earth', godFormAlternate: 'Son of Stone',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Small gains, seeds planted, the beginning of material endeavour. Patient growth.',
      modified: 'Delays, small losses, effort without visible reward. Stunted growth.',
    },
    startingPosition: { row: 5, col: 5 },
  },
  {
    type: PieceType.PAWN, element: Element.EARTH,
    godForm: 'Child of Earth', godFormAlternate: 'Son of Stone',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Small gains, seeds planted, the beginning of material endeavour. Patient growth.',
      modified: 'Delays, small losses, effort without visible reward. Stunted growth.',
    },
    startingPosition: { row: 5, col: 6 },
  },
  {
    type: PieceType.PAWN, element: Element.EARTH,
    godForm: 'Child of Earth', godFormAlternate: 'Son of Stone',
    planetaryAttrib: 'Sub-elemental', zodiacalAttrib: null,
    divinatoryMeaning: {
      upright: 'Small gains, seeds planted, the beginning of material endeavour. Patient growth.',
      modified: 'Delays, small losses, effort without visible reward. Stunted growth.',
    },
    startingPosition: { row: 4, col: 4 },
  },
];

export const FIRE_PIECES = firePieces;
export const WATER_PIECES = waterPieces;
export const AIR_PIECES = airPieces;
export const EARTH_PIECES = earthPieces;

export const ALL_PIECE_TEMPLATES: PieceTemplate[] = [
  ...firePieces,
  ...waterPieces,
  ...airPieces,
  ...earthPieces,
];

export function getPieceTemplatesForElement(element: Element): PieceTemplate[] {
  switch (element) {
    case Element.FIRE: return firePieces;
    case Element.WATER: return waterPieces;
    case Element.AIR: return airPieces;
    case Element.EARTH: return earthPieces;
  }
}
