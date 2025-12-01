import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Dices } from 'lucide-react';
import toast from 'react-hot-toast';

import { authService } from '../../services';
import { useAuthStore } from '../../stores/authStore';
import { Button, Input } from '../../components/common';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setValue('email', savedEmail);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password
      }) as any;

      console.log('Resposta do Login:', response); // Debug: Veja o que o backend retornou

      // CORREÇÃO CRÍTICA: Busca o token e user em vários lugares possíveis (raiz ou dentro de data)
      const token = response.token ||
        response.access_token ||
        response.accessToken ||
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.access_token;

      const user = response.user || response.data?.user;

      if (!token || !user) {
        throw new Error('Resposta do servidor inválida: Token ou Usuário não encontrados.');
      }

      // Atualiza a store e o localStorage
      setAuth(user, token);

      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      const userName = user.username || user.name || 'Aventureiro';

      // Adiciona a lógica de capitalização aqui também
      const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

      toast.success(`Bem-vindo de volta, ${formattedName}!`);

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error(
        error.response?.data?.message || error.message || 'Erro ao realizar login.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
              <Dices className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
            <p className="text-gray-400">Faça login para continuar sua aventura</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              error={errors.email?.message}
              leftIcon={<Mail className="w-5 h-5" />}
              {...register('email')}
            />

            <div className="space-y-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                placeholder="••••••••"
                error={errors.password?.message}
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                }
                {...register('password')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 transition-colors"
                  {...register('rememberMe')}
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Lembrar de mim
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Entrar
            </Button>

            <p className="text-center text-gray-400 text-sm mt-6">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Cadastre-se gratuitamente
              </Link>
            </p>
          </form>
        </div>
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 4Dice. Desenvolvido para jogadores de TTRPG.
        </p>
      </div>
    </div>
  );
};