// Encyclopedia: Historical Context
// The history of Enochian Chess from John Dee to modern reconstruction

export interface HistoryEntry {
  id: string;
  title: string;
  period: string;
  content: string;
}

export const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    id: 'dee-kelly',
    title: 'John Dee and Edward Kelley',
    period: '1581-1589',
    content: 'The Enochian system originated with Dr. John Dee, court astrologer to Elizabeth I, and his scryer Edward Kelley. Through a series of angelic communications conducted between 1581 and 1589, they received an elaborate system of angel magic including the Enochian language, the four Watchtower tablets, and the complex hierarchies of angels and spirits associated with each tablet. These Watchtower tablets would later become the foundation for Enochian chess.',
  },
  {
    id: 'golden-dawn',
    title: 'The Hermetic Order of the Golden Dawn',
    period: '1888-1903',
    content: 'The Golden Dawn, founded in 1888 by Westcott, Mathers, and Woodman, incorporated Dee\'s Enochian system into their grade structure and ritual practice. It was within this order that the Watchtower tablets were adapted into a four-player chess variant, likely by S.L. MacGregor Mathers. The chess system was taught in the inner (Second) order as both a strategic game and a method of divination, combining the Enochian attributions with Egyptian god-form symbolism.',
  },
  {
    id: 'whare-ra',
    title: 'The Whare Ra Temple',
    period: '1912-1978',
    content: 'The Whare Ra temple in Havelock North, New Zealand, was the longest-operating Golden Dawn temple, active from 1912 until 1978. It preserved many of the original Golden Dawn teachings and practices, including the Enochian chess manuscripts. These manuscripts, which became available after the temple closed, provided crucial details about the rules, piece attributions, and divinatory methods that had been passed down through the order.',
  },
  {
    id: 'regardie',
    title: 'Israel Regardie\'s Publication',
    period: '1937-1940',
    content: 'Israel Regardie, a member of the Stella Matutina (a successor to the Golden Dawn), published The Golden Dawn in four volumes between 1937 and 1940. This comprehensive work made the order\'s teachings publicly available for the first time, including material on Enochian chess in Volume 4. Regardie\'s publication was controversial within the occult community but ensured the preservation of these teachings for future generations.',
  },
  {
    id: 'zalewski',
    title: 'Chris Zalewski\'s Reconstruction',
    period: '1994',
    content: 'Chris Zalewski published Enochian Chess of the Golden Dawn in 1994, providing the most thorough modern reconstruction of the game. Drawing on the Whare Ra manuscripts, Regardie\'s published material, and his own research within the Golden Dawn tradition, Zalewski clarified the rules, resolved ambiguities in the source material, and provided complete instructions for both gameplay and divination. His work is the primary reference for this application.',
  },
  {
    id: 'nichols',
    title: 'Steve Nichols and Variant Rules',
    period: '1990s',
    content: 'Steve Nichols contributed additional commentary and variant rules for Enochian chess, exploring different interpretations of the source manuscripts. Where the original documents are ambiguous or contradictory, Nichols offered alternative readings that expand the possibilities of the system. This application notes his variants where they differ significantly from Zalewski\'s reconstruction.',
  },
];
