import api from './api';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types/index';

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  // Registro (com upload de avatar)
  register: async (registerData: RegisterData): Promise<{ user: User; message: string }> => {
    const formData = new FormData();
    formData.append('username', registerData.username);
    formData.append('email', registerData.email);
    formData.append('password', registerData.password);
    
    if (registerData.avatar) {
      formData.append('avatar', registerData.avatar);
    }

    const { data } = await api.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // Esqueci a senha
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  // Redefinir senha
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const { data } = await api.post('/auth/reset-password', { token, newPassword });
    return data;
  },

  // Refresh Token
  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const { data } = await api.post('/auth/refresh', { refreshToken });
    return data;
  },

  // Buscar usuário atual
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  // Atualizar Perfil
  updateProfile: async (userId: string, data: Partial<User> & { avatar?: File }): Promise<User> => {
    // 1. Se tiver avatar, fazemos o upload primeiro
    if (data.avatar) {
       const formData = new FormData();
       formData.append('file', data.avatar);
       
       await api.post('/users/upload-avatar', formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
       });
    }

    // 2. Separa dados de texto
    const { avatar, ...textData } = data;

    // 3. Se houver dados de texto para atualizar (ex: username)
    if (Object.keys(textData).length > 0) {
      // Nota: Isso requer uma rota PATCH /users/:id no backend
      const { data: updatedUser } = await api.patch<User>(`/users/${userId}`, textData);
      return updatedUser;
    }

    // Se não atualizou texto, retorna o usuário atual para atualizar o estado
    // (Assumindo que o upload do avatar já alterou o backend)
    // Como ainda não temos a rota /users/me garantida, retornamos um objeto parcial ou buscamos novamente
    // Por segurança, vamos tentar buscar o usuário atualizado se a rota existir
    try {
        const { data: currentUser } = await api.get<User>('/users/me');
        return currentUser;
    } catch (e) {
        // Fallback se a rota 'me' não existir
        return { id: userId, ...textData } as User;
    }
  }
};