import { Player, GameState, GameItem } from './types';

const PLAYERS_KEY = 'cluedo_players_v1';
const GAME_KEY = 'cluedo_game_v1';

function uid(prefix = '') { return prefix + Math.random().toString(36).slice(2,9); }

export function loadPlayers(): Player[] {
  try {
    const raw = localStorage.getItem(PLAYERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function savePlayers(players: Player[]) {
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

function defaultItems(): { suspects: string[]; weapons: string[]; rooms: string[] } {
  return {
    suspects: ['Prof. Bloom','Baronin von Porz','Fräulein Ming','Frau Weiß','Oberst von Gatow','Direktor Grün'],
    weapons: ['Heizungsrohr','Leuchter','Pistole','Seil','Dolch','Rohrzange'],
    rooms: ['Küche','Bibliothek','Salon','Speisezimmer','Billiardzimmer','Eingangshalle','Veranda','Arbeitszimmer','Musikzimmer']
  };
}

export function loadGame(players: Player[]): GameState {
  try {
    const raw = localStorage.getItem(GAME_KEY);
    if (raw) return JSON.parse(raw) as GameState;
  } catch {}
  return resetGame(players);
}

export function saveGame(state: GameState) {
  localStorage.setItem(GAME_KEY, JSON.stringify(state));
}

export function resetGame(players: Player[]): GameState {
  const defs = defaultItems();
  const items: GameItem[] = [];
  for (const s of defs.suspects) items.push({ id: uid('s_'), name: s, type: 'suspect', shownBy: null, unsure: false });
  for (const w of defs.weapons) items.push({ id: uid('w_'), name: w, type: 'weapon', shownBy: null, unsure: false });
  for (const r of defs.rooms) items.push({ id: uid('r_'), name: r, type: 'room', shownBy: null, unsure: false });
  const state: GameState = { items };
  saveGame(state);
  return state;
}

export function ensureMarksForPlayers(state: GameState, players: Player[]): GameState {
  // When players change, make sure any shownBy refers to an existing player; otherwise clear it
  for (const item of state.items) {
    if (item.shownBy && !players.find(p => p.id === item.shownBy)) {
      item.shownBy = null;
      item.unsure = false;
    }
  }
  saveGame(state);
  return state;
}
