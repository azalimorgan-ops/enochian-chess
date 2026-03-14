// Divination Spread Layouts
// Pre-configured layouts for common question types

import { Element } from '../types';

export interface SpreadPosition {
  label: string;
  description: string;
  row: number;
  col: number;
}

export interface SpreadLayout {
  id: string;
  name: string;
  description: string;
  positions: SpreadPosition[];
  suggestedElement: Element | null;
}

export const SPREAD_LAYOUTS: SpreadLayout[] = [
  {
    id: 'elemental-cross',
    name: 'Elemental Cross',
    description: 'A five-position spread examining the querent from four elemental perspectives with a central significator.',
    positions: [
      { label: 'Significator', description: 'The querent or central issue', row: 3, col: 3 },
      { label: 'Fire Aspect', description: 'Will, action, what drives the situation', row: 4, col: 3 },
      { label: 'Water Aspect', description: 'Emotion, intuition, what is felt', row: 3, col: 2 },
      { label: 'Air Aspect', description: 'Thought, communication, what is known', row: 3, col: 4 },
      { label: 'Earth Aspect', description: 'Material, practical, what is manifested', row: 2, col: 3 },
    ],
    suggestedElement: null,
  },
  {
    id: 'watchtower-gates',
    name: 'Watchtower Gates',
    description: 'Four positions at the corners of the board, representing the four Watchtowers and their influence on the question.',
    positions: [
      { label: 'Gate of Water', description: 'Emotional foundation of the matter', row: 0, col: 0 },
      { label: 'Gate of Air', description: 'Intellectual aspects and communication', row: 0, col: 7 },
      { label: 'Gate of Fire', description: 'Will and action required', row: 7, col: 0 },
      { label: 'Gate of Earth', description: 'Material outcome and manifestation', row: 7, col: 7 },
    ],
    suggestedElement: null,
  },
  {
    id: 'concourse-reading',
    name: 'Concourse of Forces',
    description: 'Examines the interplay of allied and opposing forces in a situation. Uses the alliance structure to reveal hidden dynamics.',
    positions: [
      { label: 'Ally Force 1', description: 'Your primary support or strength', row: 2, col: 2 },
      { label: 'Ally Force 2', description: 'Your secondary support or resource', row: 2, col: 5 },
      { label: 'Opposing Force 1', description: 'Primary challenge or opposition', row: 5, col: 2 },
      { label: 'Opposing Force 2', description: 'Secondary challenge or obstacle', row: 5, col: 5 },
      { label: 'Resolution', description: 'How the forces resolve', row: 3, col: 3 },
    ],
    suggestedElement: null,
  },
  {
    id: 'career-path',
    name: 'Career Path',
    description: 'A spread focused on professional development and career direction.',
    positions: [
      { label: 'Current Position', description: 'Where you stand now professionally', row: 7, col: 3 },
      { label: 'Hidden Influence', description: 'Unseen factors affecting your career', row: 5, col: 1 },
      { label: 'Challenge', description: 'The primary obstacle to overcome', row: 3, col: 3 },
      { label: 'Opportunity', description: 'What opens up when the challenge is met', row: 1, col: 5 },
      { label: 'Destination', description: 'Where this path leads', row: 0, col: 4 },
    ],
    suggestedElement: Element.EARTH,
  },
  {
    id: 'relationship',
    name: 'Relationship Mirror',
    description: 'Examines the dynamics between two people or forces in a relationship.',
    positions: [
      { label: 'Self', description: 'How you appear in this relationship', row: 6, col: 1 },
      { label: 'Other', description: 'How the other appears to you', row: 1, col: 6 },
      { label: 'Connection', description: 'What binds you together', row: 3, col: 3 },
      { label: 'Tension', description: 'Where friction exists', row: 4, col: 4 },
      { label: 'Potential', description: 'What the relationship can become', row: 0, col: 3 },
    ],
    suggestedElement: Element.WATER,
  },
  {
    id: 'spiritual-development',
    name: 'Pillar of Ascent',
    description: 'Tracks spiritual development through the elemental grades, from Earth to Spirit.',
    positions: [
      { label: 'Malkuth (Earth)', description: 'Your material foundation and body', row: 7, col: 3 },
      { label: 'Yesod (Water)', description: 'Your emotional and astral body', row: 5, col: 3 },
      { label: 'Hod/Netzach (Air)', description: 'Your intellectual and creative mind', row: 3, col: 3 },
      { label: 'Tiphareth (Fire)', description: 'Your true will and higher self', row: 1, col: 3 },
    ],
    suggestedElement: Element.FIRE,
  },
];
