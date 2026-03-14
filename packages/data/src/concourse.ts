// Concourse of Forces
// The alliance system that determines which elements are allied in a game
//
// In the Golden Dawn system, alliances are determined by the opening element.
// Sympathetic (friendly) elements ally together:
//   Fire + Air (share heat) vs Water + Earth (share cold)
//
// Turn order proceeds from the opening element through the cycle:
//   Fire -> Water -> Air -> Earth (following the Watchtower rotation)

import { Element, ConcourseConfig } from './types';

// The primary Concourse: friendly elements ally
// Fire+Air vs Water+Earth
export const CONCOURSE_CONFIGS: Record<Element, ConcourseConfig> = {
  [Element.FIRE]: {
    openingElement: Element.FIRE,
    turnOrder: [Element.FIRE, Element.WATER, Element.AIR, Element.EARTH],
    team1: [Element.FIRE, Element.AIR],
    team2: [Element.WATER, Element.EARTH],
  },
  [Element.WATER]: {
    openingElement: Element.WATER,
    turnOrder: [Element.WATER, Element.AIR, Element.EARTH, Element.FIRE],
    team1: [Element.WATER, Element.EARTH],
    team2: [Element.FIRE, Element.AIR],
  },
  [Element.AIR]: {
    openingElement: Element.AIR,
    turnOrder: [Element.AIR, Element.EARTH, Element.FIRE, Element.WATER],
    team1: [Element.FIRE, Element.AIR],
    team2: [Element.WATER, Element.EARTH],
  },
  [Element.EARTH]: {
    openingElement: Element.EARTH,
    turnOrder: [Element.EARTH, Element.FIRE, Element.WATER, Element.AIR],
    team1: [Element.WATER, Element.EARTH],
    team2: [Element.FIRE, Element.AIR],
  },
};

export function getConcourse(openingElement: Element): ConcourseConfig {
  return CONCOURSE_CONFIGS[openingElement];
}

export function areAllied(config: ConcourseConfig, e1: Element, e2: Element): boolean {
  const { team1, team2 } = config;
  return (team1.includes(e1) && team1.includes(e2)) ||
         (team2.includes(e1) && team2.includes(e2));
}

export function getTeamOf(config: ConcourseConfig, element: Element): [Element, Element] {
  if (config.team1.includes(element)) return config.team1;
  return config.team2;
}

export function getOpposingTeam(config: ConcourseConfig, element: Element): [Element, Element] {
  if (config.team1.includes(element)) return config.team2;
  return config.team1;
}
