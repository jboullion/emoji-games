export const Games = [
  {
    name: 'Battle',
    emoji: '⚔️',
    description: 'Control a team of emojis in a battle with a friend or an AI',
  },
  {
    name: 'Puzzle',
    emoji: '🧩',
    description:
      'Put together a random puzzle of emojis by yourself or with friends',
  },
  {
    name: 'Search',
    emoji: '🔍',
    description: 'Search Emojis',
  },
];

export type Game = {
  name: string;
  emoji: string;
  description: string;
};
