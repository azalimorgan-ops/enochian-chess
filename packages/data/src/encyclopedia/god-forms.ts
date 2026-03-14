// Encyclopedia: Egyptian God-Form Entries
// Mythology and esoteric context for each god-form used in the piece system

export interface GodFormEntry {
  name: string;
  alternateName: string;
  mythology: string;
  gdAttribution: string;
  symbolism: string;
}

export const GOD_FORMS: Record<string, GodFormEntry> = {
  osiris: {
    name: 'Osiris',
    alternateName: 'Ptah',
    mythology: 'Lord of the Underworld and judge of the dead. Murdered and dismembered by his brother Set, he was reassembled by Isis and resurrected as ruler of the afterlife. His death and rebirth represent the eternal cycle of dissolution and regeneration.',
    gdAttribution: 'Attributed to Sol and the King piece. In the Golden Dawn system, Osiris represents the divine masculine principle — the Dying and Rising God whose sacrifice creates the conditions for renewal. As the King, he is the central authority whose fate determines the outcome of the game.',
    symbolism: 'The crook and flail, the white crown of Upper Egypt, the green skin of vegetation and renewal. His throne name means "Mighty One" — the seat of power that persists even through death.',
  },
  isis: {
    name: 'Isis',
    alternateName: 'Nephthys',
    mythology: 'Great Mother, mistress of magic, and queen of heaven. She reassembled the body of Osiris, conceived Horus through magical rites, and protected her son from Set. Her magical knowledge was said to exceed even that of Ra himself.',
    gdAttribution: 'Attributed to Luna and the Queen piece. In the Golden Dawn system, Isis represents the divine feminine principle — receptive, intuitive, and magical. As the Queen, she moves diagonally by one square, reflecting the indirect and subtle nature of lunar influence.',
    symbolism: 'The throne hieroglyph upon her head, the tyet (knot of Isis), the sistrum. She is the seat upon which the King sits — power that supports and enables rather than commands directly.',
  },
  horus: {
    name: 'Horus',
    alternateName: 'Aroueris',
    mythology: 'The falcon-headed god, son of Osiris and Isis. He battled Set to avenge his father and reclaim the throne of Egypt. In the struggle he lost an eye, which became the sacred Wedjat — the Eye of Horus, symbol of wholeness restored.',
    gdAttribution: 'Attributed to the element-of-element and the Bishop piece. Horus represents the purest expression of his army\'s element — Fire of Fire, Water of Water, Air of Air, or Earth of Earth. As the Bishop, he moves diagonally across the board, cutting through opposition with elemental precision.',
    symbolism: 'The falcon, the Wedjat eye, the double crown of unified Egypt. He is the rightful heir — the principle of legitimate succession and the restoration of cosmic order.',
  },
  typhon: {
    name: 'Typhon',
    alternateName: 'Set',
    mythology: 'God of storms, deserts, chaos, and foreigners. He murdered his brother Osiris out of jealousy and battled Horus for the throne. In earlier mythology he was a protector of Ra, defending the sun barque against the serpent Apophis during its nightly journey.',
    gdAttribution: 'Attributed to variable planetary forces and the Knight piece. In the Golden Dawn system, Typhon/Set represents the necessary disruptive force — chaos that breaks stagnation and creates the conditions for new growth. As the Knight, he leaps over obstacles in unpredictable ways.',
    symbolism: 'The Set animal (an unidentified creature), the was-sceptre of power, the red desert. He is ambiguity itself — destroyer and protector, villain and necessary catalyst.',
  },
  canopic: {
    name: 'Canopic Jar',
    alternateName: 'Sons of Horus',
    mythology: 'The four Canopic jars held the preserved organs of the deceased: Amset (liver), Hapi (lungs), Tuamautef (stomach), and Qebhsennuf (intestines). Each was protected by one of the four sons of Horus and associated with a cardinal direction and goddess.',
    gdAttribution: 'Attributed to variable planetary forces and the Rook piece. The Canopic jars represent containment and preservation — the vessel that holds sacred substance. As the Rook, they provide the structural framework of the army, moving in straight lines that define boundaries.',
    symbolism: 'The four jars with their distinctive lids (human, baboon, jackal, falcon), representing the preservation of what is essential through the process of transformation.',
  },
};
