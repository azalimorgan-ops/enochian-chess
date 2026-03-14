// Elemental Dignity System
// The Golden Dawn's system for interpreting elemental interactions
//
// Friendly: Elements that strengthen each other (share heat or moisture)
// Hostile: Elements that weaken each other (oppose in both qualities)
// Neutral: Same element — no modification
// Mixed: Elements that share one quality but oppose in another

import { Element, DignityRelation } from './types';

export const DIGNITY_MATRIX: Record<Element, Record<Element, DignityRelation>> = {
  [Element.FIRE]: {
    [Element.FIRE]:  DignityRelation.NEUTRAL,
    [Element.WATER]: DignityRelation.HOSTILE,   // Fire (hot+dry) vs Water (cold+wet) — oppose both
    [Element.AIR]:   DignityRelation.FRIENDLY,   // Fire (hot+dry) + Air (hot+wet) — share heat
    [Element.EARTH]: DignityRelation.MIXED,      // Fire (hot+dry) + Earth (cold+dry) — share dryness, oppose heat
  },
  [Element.WATER]: {
    [Element.FIRE]:  DignityRelation.HOSTILE,
    [Element.WATER]: DignityRelation.NEUTRAL,
    [Element.AIR]:   DignityRelation.MIXED,      // Water (cold+wet) + Air (hot+wet) — share moisture, oppose heat
    [Element.EARTH]: DignityRelation.FRIENDLY,   // Water (cold+wet) + Earth (cold+dry) — share cold
  },
  [Element.AIR]: {
    [Element.FIRE]:  DignityRelation.FRIENDLY,
    [Element.WATER]: DignityRelation.MIXED,
    [Element.AIR]:   DignityRelation.NEUTRAL,
    [Element.EARTH]: DignityRelation.HOSTILE,    // Air (hot+wet) vs Earth (cold+dry) — oppose both
  },
  [Element.EARTH]: {
    [Element.FIRE]:  DignityRelation.MIXED,
    [Element.WATER]: DignityRelation.FRIENDLY,
    [Element.AIR]:   DignityRelation.HOSTILE,
    [Element.EARTH]: DignityRelation.NEUTRAL,
  },
};

export function getDignity(e1: Element, e2: Element): DignityRelation {
  return DIGNITY_MATRIX[e1][e2];
}

export function isFriendly(e1: Element, e2: Element): boolean {
  return getDignity(e1, e2) === DignityRelation.FRIENDLY;
}

export function isHostile(e1: Element, e2: Element): boolean {
  return getDignity(e1, e2) === DignityRelation.HOSTILE;
}
