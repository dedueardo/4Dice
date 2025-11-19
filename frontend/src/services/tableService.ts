import api from './api';
import type { Table, CreateTableFormData, ApiResponse, PaginatedResponse } from '../types';

export const tableService = {
  /**
   * Busca todas as mesas do usuário
   */
  async getMyTables(): Promise<Table[]> {
    const response = await api.get<ApiResponse<Table[]>>('/tables/my');
    return response.data.data;
  },

  /**
   * Busca mesa por ID
   */
  async getTableById(tableId: string): Promise<Table> {
    const response = await api.get<ApiResponse<Table>>(`/tables/${tableId}`);
    return response.data.data;
  },

  /**
   * Cria nova mesa
   */
  async createTable(data: CreateTableFormData): Promise<Table> {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('system', data.system);
    formData.append('description', data.description);
    formData.append('maxPlayers', data.maxPlayers.toString());
    formData.append('visibility', data.visibility);

    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }

    const response = await api.post<ApiResponse<Table>>('/tables', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  /**
   * Atualiza mesa
   */
  async updateTable(tableId: string, data: Partial<CreateTableFormData>): Promise<Table> {
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.system) formData.append('system', data.system);
    if (data.description) formData.append('description', data.description);
    if (data.maxPlayers) formData.append('maxPlayers', data.maxPlayers.toString());
    if (data.visibility) formData.append('visibility', data.visibility);
    if (data.coverImage) formData.append('coverImage', data.coverImage);

    const response = await api.patch<ApiResponse<Table>>(`/tables/${tableId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  /**
   * Deleta mesa
   */
  async deleteTable(tableId: string): Promise<void> {
    await api.delete(`/tables/${tableId}`);
  },

  /**
   * Arquiva mesa
   */
  async archiveTable(tableId: string): Promise<Table> {
    const response = await api.patch<ApiResponse<Table>>(`/tables/${tableId}/archive`);
    return response.data.data;
  },

  /**
   * Gera código de convite
   */
  async generateInviteCode(tableId: string): Promise<{ inviteCode: string }> {
    const response = await api.post<ApiResponse<{ inviteCode: string }>>(
      `/tables/${tableId}/invite`
    );
    return response.data.data;
  },

  /**
   * Participa de mesa via código de convite
   */
  async joinTableByCode(inviteCode: string): Promise<Table> {
    const response = await api.post<ApiResponse<Table>>('/tables/join', {
      inviteCode,
    });
    return response.data.data;
  },

  /**
   * Remove jogador da mesa
   */
  async removePlayer(tableId: string, userId: string): Promise<void> {
    await api.delete(`/tables/${tableId}/players/${userId}`);
  },

  /**
   * Sai da mesa
   */
  async leaveTable(tableId: string): Promise<void> {
    await api.post(`/tables/${tableId}/leave`);
  },

  /**
   * Busca mesas públicas
   */
  async getPublicTables(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Table>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Table>>>('/tables/public', {
      params: { page, pageSize },
    });
    return response.data.data;
  },
};