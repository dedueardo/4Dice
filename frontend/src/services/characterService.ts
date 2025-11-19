import api from './api';
import type { Character, CreateCharacterFormData, ApiResponse } from '../types';

export const characterService = {
  /**
   * Busca todos os personagens de uma mesa
   */
  async getCharactersByTable(tableId: string): Promise<Character[]> {
    const response = await api.get<ApiResponse<Character[]>>(`/tables/${tableId}/characters`);
    return response.data.data;
  },

  /**
   * Busca personagem por ID
   */
  async getCharacterById(characterId: string): Promise<Character> {
    const response = await api.get<ApiResponse<Character>>(`/characters/${characterId}`);
    return response.data.data;
  },

  /**
   * Busca meu personagem em uma mesa específica
   */
  async getMyCharacterInTable(tableId: string): Promise<Character | null> {
    try {
      const response = await api.get<ApiResponse<Character>>(`/tables/${tableId}/my-character`);
      return response.data.data;
    } catch (error) {
      return null;
    }
  },

  /**
   * Cria novo personagem
   */
  async createCharacter(tableId: string, data: CreateCharacterFormData): Promise<Character> {
    const formData = new FormData();

    formData.append('tableId', tableId);
    formData.append('name', data.name);
    formData.append('race', data.race);
    formData.append('class', data.class);
    formData.append('level', data.level.toString());
    formData.append('background', data.background);
    formData.append('attributes', JSON.stringify(data.attributes));

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await api.post<ApiResponse<Character>>('/characters', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  /**
   * Atualiza personagem
   */
  async updateCharacter(characterId: string, data: Partial<Character>): Promise<Character> {
    const response = await api.patch<ApiResponse<Character>>(`/characters/${characterId}`, data);
    return response.data.data;
  },

  /**
   * Deleta personagem
   */
  async deleteCharacter(characterId: string): Promise<void> {
    await api.delete(`/characters/${characterId}`);
  },

  /**
   * Atualiza HP do personagem
   */
  async updateHP(characterId: string, hp: { current: number; max: number; temporary: number }): Promise<Character> {
    const response = await api.patch<ApiResponse<Character>>(`/characters/${characterId}/hp`, { hp });
    return response.data.data;
  },

  /**
   * Adiciona item ao inventário
   */
  async addItem(characterId: string, item: any): Promise<Character> {
    const response = await api.post<ApiResponse<Character>>(`/characters/${characterId}/items`, item);
    return response.data.data;
  },

  /**
   * Remove item do inventário
   */
  async removeItem(characterId: string, itemId: string): Promise<Character> {
    const response = await api.delete<ApiResponse<Character>>(`/characters/${characterId}/items/${itemId}`);
    return response.data.data;
  },

  /**
   * Adiciona magia ao personagem
   */
  async addSpell(characterId: string, spell: any): Promise<Character> {
    const response = await api.post<ApiResponse<Character>>(`/characters/${characterId}/spells`, spell);
    return response.data.data;
  },

  /**
   * Remove magia do personagem
   */
  async removeSpell(characterId: string, spellId: string): Promise<Character> {
    const response = await api.delete<ApiResponse<Character>>(`/characters/${characterId}/spells/${spellId}`);
    return response.data.data;
  },
};