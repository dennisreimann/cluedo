export type Player = { id: string; name: string };
export type ItemType = 'suspect' | 'weapon' | 'room';
export type GameItem = { id: string; name: string; type: ItemType; shownBy?: string | null; unsure?: boolean };
export type GameState = { items: GameItem[] };
