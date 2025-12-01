// ==================== USER ====================
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  biography?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  tablesAsMaster: Table[];
  tablesAsPlayer: Table[];
  totalSessions: number;
}

// ==================== TABLE ====================
export interface Table {
  id: string;
  name: string;
  system: GameSystem;
  description: string;
  coverImage?: string;
  visibility: 'public' | 'private';
  maxPlayers: number;
  masterId: string;
  master?: User;
  players: Player[];
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  inviteCode?: string;
}

export type GameSystem = 'dnd5e' | 'pathfinder' | 'call_of_cthulhu' | 'custom';

export interface Player {
  userId: string;
  user?: User;
  tableId: string;
  characterId?: string;
  character?: Character;
  joinedAt: string;
  role: 'player' | 'master';
}

// ==================== CHARACTER ====================
export interface Character {
  id: string;
  tableId: string;
  userId: string;
  name: string;
  race: string;
  class: string;
  level: number;
  avatar?: string;
  type: 'player' | 'npc' | 'enemy';
  
  // Stats
  attributes: Attributes;
  hp: HitPoints;
  ac: number;
  initiative: number;
  proficiencyBonus: number;
  speed: number;
  
  // Skills & Abilities
  skills: Skill[];
  savingThrows: SavingThrow[];
  
  // Inventory
  equipment: Item[];
  inventory: Item[];
  currency: Currency;
  
  // Spells (se aplicável)
  spells?: Spell[];
  spellSlots?: SpellSlots;
  
  // Background & RP
  background: string;
  traits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  notes: string;
  
  // Metadata
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface HitPoints {
  current: number;
  max: number;
  temporary: number;
}

export interface Skill {
  name: string;
  attribute: keyof Attributes;
  proficient: boolean;
  expertise: boolean;
  bonus: number;
}

export interface SavingThrow {
  attribute: keyof Attributes;
  proficient: boolean;
  bonus: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'tool' | 'treasure' | 'other';
  quantity: number;
  weight: number;
  value: number; // em PO (peças de ouro)
  equipped: boolean;
  properties?: string[];
}

export interface Currency {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  isPrepared: boolean;
  isRitual: boolean;
}

export interface SpellSlots {
  level1: { current: number; max: number };
  level2: { current: number; max: number };
  level3: { current: number; max: number };
  level4: { current: number; max: number };
  level5: { current: number; max: number };
  level6: { current: number; max: number };
  level7: { current: number; max: number };
  level8: { current: number; max: number };
  level9: { current: number; max: number };
}

// ==================== DICE ====================
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceRoll {
  id: string;
  userId: string;
  username: string;
  characterName?: string;
  tableId: string;
  diceType: DiceType;
  quantity: number;
  modifier: number;
  advantage?: boolean;
  disadvantage?: boolean;
  results: number[];
  total: number;
  type: 'normal' | 'attack' | 'damage' | 'skill' | 'saving_throw';
  isPrivate: boolean;
  isCritical?: boolean;
  isCriticalFail?: boolean;
  timestamp: string;
}

export interface DiceFormula {
  formula: string; // Ex: "2d6+1d8+3"
  parsed: DiceTerm[];
}

export interface DiceTerm {
  type: 'dice' | 'modifier';
  quantity?: number;
  diceType?: DiceType;
  value?: number;
}

// ==================== CHAT ====================
export interface ChatMessage {
  id: string;
  tableId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  type: 'text' | 'dice' | 'action' | 'system' | 'private';
  diceRoll?: DiceRoll;
  recipientId?: string; // Para mensagens privadas
  timestamp: string;
}

// ==================== MAP ====================
export interface MapData {
  id: string;
  tableId: string;
  name: string;
  imageUrl: string;
  gridType: 'square' | 'hexagonal' | 'none';
  gridSize: number; // em pixels
  width: number;
  height: number;
  fogOfWar: FogOfWarData;
  layers: MapLayer[];
  isActive: boolean;
  createdAt: string;
}

export interface FogOfWarData {
  enabled: boolean;
  revealedAreas: RevealedArea[];
}

export interface RevealedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'background' | 'tokens' | 'drawings' | 'fog';
  visible: boolean;
  locked: boolean;
  order: number;
}

export interface Token {
  id: string;
  characterId: string;
  character?: Character;
  mapId: string;
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  scale: number;
  imageUrl?: string;
  statusEffects: StatusEffect[];
  isVisible: boolean;
  showLabel: boolean;
  showHp: boolean;
}

export interface StatusEffect {
  id: string;
  name: string;
  icon?: string;
  duration?: number; // em rodadas
  description: string;
}

// ==================== SESSION ====================
export interface Session {
  id: string;
  tableId: string;
  scheduledFor?: string;
  startedAt?: string;
  endedAt?: string;
  duration?: number; // em minutos
  status: 'scheduled' | 'active' | 'paused' | 'completed';
  summary?: string;
  notes: SessionNote[];
  participants: string[]; // User IDs
  currentMapId?: string;
  initiativeOrder?: InitiativeEntry[];
  currentRound?: number;
  currentTurn?: number;
}

export interface SessionNote {
  id: string;
  content: string;
  authorId: string;
  timestamp: string;
}

export interface InitiativeEntry {
  id: string;
  characterId: string;
  character?: Character;
  initiative: number;
  conditions: StatusEffect[];
}

// ==================== API RESPONSE ====================
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// ==================== FORMS ====================
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: File;
}

export interface CreateTableFormData {
  name: string;
  system: GameSystem;
  description: string;
  maxPlayers: number;
  visibility: 'public' | 'private';
  coverImage?: File;
}

export interface CreateCharacterFormData {
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  attributes: Attributes;
  avatar?: File;
}

// ==================== AUTH SERVICE TYPES ====================
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  };
  success: boolean;
}