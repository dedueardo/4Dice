import { create } from 'zustand';
import { Character } from '../types';
import { characterService } from '../services';

interface CharacterState {
  // Estado
  characters: Character[];
  currentCharacter: Character | null;
  myCharacter: Character | null;
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchCharactersByTable: (tableId: string) => Promise<void>;
  fetchCharacterById: (characterId: string) => Promise<void>;
  fetchMyCharacterInTable: (tableId: string) => Promise<void>;
  createCharacter: (tableId: string, data: any) => Promise<Character>;
  updateCharacter: (characterId: string, data: Partial<Character>) => Promise<void>;
  deleteCharacter: (characterId: string) => Promise<void>;
  updateHP: (characterId: string, hp: any) => Promise<void>;
  addItem: (characterId: string, item: any) => Promise<void>;
  removeItem: (characterId: string, itemId: string) => Promise<void>;
  addSpell: (characterId: string, spell: any) => Promise<void>;
  removeSpell: (characterId: string, spellId: string) => Promise<void>;
  setCurrentCharacter: (character: Character | null) => void;
  clearError: () => void;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  // Estado inicial
  characters: [],
  currentCharacter: null,
  myCharacter: null,
  isLoading: false,
  error: null,

  // Buscar personagens por mesa
  fetchCharactersByTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const characters = await characterService.getCharactersByTable(tableId);
      set({ characters, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao buscar personagens',
        isLoading: false,
      });
    }
  },

  // Buscar personagem por ID
  fetchCharacterById: async (characterId) => {
    set({ isLoading: true, error: null });
    try {
      const character = await characterService.getCharacterById(characterId);
      set({ currentCharacter: character, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao buscar personagem',
        isLoading: false,
      });
    }
  },

  // Buscar meu personagem em uma mesa
  fetchMyCharacterInTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const character = await characterService.getMyCharacterInTable(tableId);
      set({ myCharacter: character, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao buscar seu personagem',
        isLoading: false,
      });
    }
  },

  // Criar personagem
  createCharacter: async (tableId, data) => {
    set({ isLoading: true, error: null });
    try {
      const newCharacter = await characterService.createCharacter(tableId, data);
      set((state) => ({
        characters: [...state.characters, newCharacter],
        myCharacter: newCharacter,
        currentCharacter: newCharacter,
        isLoading: false,
      }));
      return newCharacter;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao criar personagem',
        isLoading: false,
      });
      throw error;
    }
  },

  // Atualizar personagem
  updateCharacter: async (characterId, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCharacter = await characterService.updateCharacter(characterId, data);
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === characterId ? updatedCharacter : c
        ),
        currentCharacter:
          state.currentCharacter?.id === characterId
            ? updatedCharacter
            : state.currentCharacter,
        myCharacter:
          state.myCharacter?.id === characterId ? updatedCharacter : state.myCharacter,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao atualizar personagem',
        isLoading: false,
      });
      throw error;
    }
  },

  // Deletar personagem
  deleteCharacter: async (characterId) => {
    set({ isLoading: true, error: null });
    try {
      await characterService.deleteCharacter(characterId);
      set((state) => ({
        characters: state.characters.filter((c) => c.id !== characterId),
        currentCharacter:
          state.currentCharacter?.id === characterId ? null : state.currentCharacter,
        myCharacter: state.myCharacter?.id === characterId ? null : state.myCharacter,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao deletar personagem',
        isLoading: false,
      });
      throw error;
    }
  },

  // Atualizar HP
  updateHP: async (characterId, hp) => {
    try {
      const updatedCharacter = await characterService.updateHP(characterId, hp);
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === characterId ? updatedCharacter : c
        ),
        currentCharacter:
          state.currentCharacter?.id === characterId
            ? updatedCharacter
            : state.currentCharacter,
        myCharacter:
          state.myCharacter?.id === characterId ? updatedCharacter : state.myCharacter,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao atualizar HP',
      });
      throw error;
    }
  },

  // Adicionar item
  addItem: async (characterId, item) => {
    try {
      const updatedCharacter = await characterService.addItem(characterId, item);
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === characterId ? updatedCharacter : c
        ),
        currentCharacter:
          state.currentCharacter?.id === characterId
            ? updatedCharacter
            : state.currentCharacter,
        myCharacter:
          state.myCharacter?.id === characterId ? updatedCharacter : state.myCharacter,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao adicionar item',
      });
      throw error;
    }
  },

  // Remover item
  removeItem: async (characterId, itemId) => {
    try {
      const updatedCharacter = await characterService.removeItem(characterId, itemId);
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === characterId ? updatedCharacter : c
        ),
        currentCharacter:
          state.currentCharacter?.id === characterId
            ? updatedCharacter
            : state.currentCharacter,
        myCharacter:
          state.myCharacter?.id === characterId ? updatedCharacter : state.myCharacter,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao remover item',
      });
      throw error;
    }
  },

  // Adicionar magia
  addSpell: async (characterId, spell) => {
    try {
      const updatedCharacter = await characterService.addSpell(characterId, spell);
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === characterId ? updatedCharacter : c
        ),
        currentCharacter:
          state.currentCharacter?.id === characterId
            ? updatedCharacter
            : state.currentCharacter,
        myCharacter:
          state.myCharacter?.id === characterId ? updatedCharacter : state.myCharacter,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao adicionar magia',
      });
      throw error;
    }
  },

  // Remover magia
  removeSpell: async (characterId, spellId) => {
    try {
      const updatedCharacter = await characterService.removeSpell(characterId, spellId);
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === characterId ? updatedCharacter : c
        ),
        currentCharacter:
          state.currentCharacter?.id === characterId
            ? updatedCharacter
            : state.currentCharacter,
        myCharacter:
          state.myCharacter?.id === characterId ? updatedCharacter : state.myCharacter,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao remover magia',
      });
      throw error;
    }
  },

  // Setters
  setCurrentCharacter: (character) => set({ currentCharacter: character }),
  clearError: () => set({ error: null }),
}));