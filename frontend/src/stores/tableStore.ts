import { create } from 'zustand';
import type { Table } from '../types';
import { tableService } from '../services';

interface TableState {
  // Estado
  tables: Table[];
  currentTable: Table | null;
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchMyTables: () => Promise<void>;
  fetchTableById: (tableId: string) => Promise<void>;
  createTable: (data: any) => Promise<Table>;
  updateTable: (tableId: string, data: any) => Promise<void>;
  deleteTable: (tableId: string) => Promise<void>;
  archiveTable: (tableId: string) => Promise<void>;
  generateInviteCode: (tableId: string) => Promise<string>;
  joinTableByCode: (inviteCode: string) => Promise<void>;
  removePlayer: (tableId: string, userId: string) => Promise<void>;
  leaveTable: (tableId: string) => Promise<void>;
  setCurrentTable: (table: Table | null) => void;
  clearError: () => void;
}

export const useTableStore = create<TableState>((set, get) => ({
  // Estado inicial
  tables: [],
  currentTable: null,
  isLoading: false,
  error: null,

  // Buscar minhas mesas
  fetchMyTables: async () => {
    set({ isLoading: true, error: null });
    try {
      const tables = await tableService.getMyTables();
      set({ tables, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao buscar mesas',
        isLoading: false,
      });
    }
  },

  // Buscar mesa por ID
  fetchTableById: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tableService.getTableById(tableId);
      set({ currentTable: table, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao buscar mesa',
        isLoading: false,
      });
    }
  },

  // Criar mesa
  createTable: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const newTable = await tableService.createTable(data);
      set((state) => ({
        tables: [...state.tables, newTable],
        currentTable: newTable,
        isLoading: false,
      }));
      return newTable;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao criar mesa',
        isLoading: false,
      });
      throw error;
    }
  },

  // Atualizar mesa
  updateTable: async (tableId, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTable = await tableService.updateTable(tableId, data);
      set((state) => ({
        tables: state.tables.map((t) => (t.id === tableId ? updatedTable : t)),
        currentTable: state.currentTable?.id === tableId ? updatedTable : state.currentTable,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao atualizar mesa',
        isLoading: false,
      });
      throw error;
    }
  },

  // Deletar mesa
  deleteTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      await tableService.deleteTable(tableId);
      set((state) => ({
        tables: state.tables.filter((t) => t.id !== tableId),
        currentTable: state.currentTable?.id === tableId ? null : state.currentTable,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao deletar mesa',
        isLoading: false,
      });
      throw error;
    }
  },

  // Arquivar mesa
  archiveTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const archivedTable = await tableService.archiveTable(tableId);
      set((state) => ({
        tables: state.tables.map((t) => (t.id === tableId ? archivedTable : t)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao arquivar mesa',
        isLoading: false,
      });
      throw error;
    }
  },

  // Gerar código de convite
  generateInviteCode: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      const { inviteCode } = await tableService.generateInviteCode(tableId);
      set({ isLoading: false });
      return inviteCode;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao gerar código de convite',
        isLoading: false,
      });
      throw error;
    }
  },

  // Entrar em mesa por código
  joinTableByCode: async (inviteCode) => {
    set({ isLoading: true, error: null });
    try {
      const table = await tableService.joinTableByCode(inviteCode);
      set((state) => ({
        tables: [...state.tables, table],
        currentTable: table,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao entrar na mesa',
        isLoading: false,
      });
      throw error;
    }
  },

  // Remover jogador
  removePlayer: async (tableId, userId) => {
    set({ isLoading: true, error: null });
    try {
      await tableService.removePlayer(tableId, userId);
      // Atualizar a mesa atual
      if (get().currentTable?.id === tableId) {
        await get().fetchTableById(tableId);
      }
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao remover jogador',
        isLoading: false,
      });
      throw error;
    }
  },

  // Sair da mesa
  leaveTable: async (tableId) => {
    set({ isLoading: true, error: null });
    try {
      await tableService.leaveTable(tableId);
      set((state) => ({
        tables: state.tables.filter((t) => t.id !== tableId),
        currentTable: state.currentTable?.id === tableId ? null : state.currentTable,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Erro ao sair da mesa',
        isLoading: false,
      });
      throw error;
    }
  },

  // Setters
  setCurrentTable: (table) => set({ currentTable: table }),
  clearError: () => set({ error: null }),
}));