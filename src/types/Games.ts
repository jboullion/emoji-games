export type Game = {
  name: string;
  emoji: string;
  description: string;
  maxPlayers: number;
};

export const Games: Game[] = [
  {
    name: 'Battle',
    emoji: '⚔️',
    description: 'Control a team of emojis in a battle with a friend or an AI',
    maxPlayers: 2,
  },
  {
    name: 'Puzzle',
    emoji: '🧩',
    description:
      'Put together a random puzzle of emojis by yourself or with friends',
    maxPlayers: 5,
  },
  {
    name: 'Search',
    emoji: '🔍',
    description: 'Search Emojis',
    maxPlayers: 1,
  },
  {
    name: 'Fly',
    emoji: '🐦',
    description: 'Fly emojis, score points!',
    maxPlayers: 2,
  },
  {
    name: 'Sets',
    emoji: '💎',
    description: 'Match a set of emojis and watch more drop into place!',
    maxPlayers: 2,
  },
  {
    name: 'Guess',
    emoji: '🤔',
    description:
      'Ask questions to figure out which emoji the other person has!',
    maxPlayers: 2,
  },
  {
    name: 'RPSLS',
    emoji: '✂️',
    description: '1-5 players try to guess what emoji the others will show',
    maxPlayers: 5,
  },
  {
    name: 'Memory',
    emoji: '🧠',
    description: 'How many emoji can you remember?',
    maxPlayers: 5,
  },
];
