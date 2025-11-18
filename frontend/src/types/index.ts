// Tipos principais baseados nos requisitos funcionais

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  biography?: string;
  createdAt: string;
}

export interface Table {
  id: string;
  name: string;
  system: GameSystem;
  description: string;
  coverImage?: string;
  visibility: 'public' | 'private';
  maxPlayers: number;
  masterId: string;
  createdAt: string;
  isArchived: boolean;
}

export type GameSystem = 'dnd5e' | 'pathfinder' | 'call_of_cthulhu' | 'custom';

export interface Character {
  id: string;
  tableId: string;
  userId: string;
  name: string;
  race: string;
  class: string;
  level: number;
  avatar?: string;
  attributes: Attributes;
  hp: { current: number; max: number };
  ac: number;
  initiative: number;
  skills: Skill[];
  equipment: Item[];
  spells?: Spell[];
  background: string;
  traits: string;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface DiceRoll {
  id: string;
  userId: string;
  username: string;
  diceType: DiceType;
  quantity: number;
  modifier: number;
  result: number[];
  total: number;
  isPrivate: boolean;
  timestamp: string;
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface ChatMessage {
  id: string;
  tableId: string;
  userId: string;
  username: string;
  content: string;
  type: 'text' | 'dice' | 'action' | 'system' | 'private';
  timestamp: string;
  recipientId?: string; // Para mensagens privadas
}

export interface MapData {
  id: string;
  tableId: string;
  name: string;
  imageUrl: string;
  gridType: 'square' | 'hexagonal' | 'none';
  gridSize: number;
  width: number;
  height: number;
  fogOfWar: boolean;
}

export interface Token {
  id: string;
  characterId: string;
  mapId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  imageUrl?: string;
  statusEffects: string[];
}