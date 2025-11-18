import api from './api';
import { User, LoginFormData, RegisterFormData, ApiResponse } from '../types';

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: User;
  message: string;
}

export const authService = {
  /**
   * Faz login do usuário
   */
  async login(data: LoginFormData): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
      email: data.email,
      password: data.password,
    });

    const { user, accessToken, refreshToken } = response.data.data;

    // Salvar tokens no localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // Se "Lembrar-me" estiver marcado, salvar por mais tempo
    if (data.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }

    return response.data.data;
  },

  /**
   * Registra novo usuário
   */
  async register(data: RegisterFormData): Promise<RegisterResponse> {
    const formData = new FormData();
    
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Limpar tokens independente do resultado
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('rememberMe');
    }
  },

  /**
   * Envia email para recuperação de senha
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
      email,
    });

    return response.data.data;
  },

  /**
   * Redefine senha com token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
      token,
      newPassword,
    });

    return response.data.data;
  },

  /**
   * Busca informações do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  /**
   * Atualiza perfil do usuário
   */
  async updateProfile(data: Partial<User> & { avatar?: File }): Promise<User> {
    const formData = new FormData();

    if (data.username) formData.append('username', data.username);
    if (data.biography) formData.append('biography', data.biography);
    if (data.avatar) formData.append('avatar', data.avatar);

    const response = await api.patch<ApiResponse<User>>('/auth/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Retorna o token de acesso
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  /**
   * Retorna o refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },
};