import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Dices, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { authService } from '../../services';
import { Button, Input } from '../../components/common';

const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setEmailSent(true);
      toast.success('E-mail de recuperação enviado!');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Erro ao enviar e-mail de recuperação'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Efeito de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
          {/* Botão Voltar */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao login
          </Link>

          {emailSent ? (
            // Sucesso
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 border border-green-500/30 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>

              <h1 className="text-2xl font-bold text-white">
                E-mail Enviado!
              </h1>

              <p className="text-gray-400">
                Enviamos um link de recuperação para o seu e-mail. Verifique sua
                caixa de entrada e spam.
              </p>

              <div className="pt-4">
                <Link to="/login">
                  <Button variant="primary" fullWidth>
                    Voltar ao Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            // Formulário
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
                  <Dices className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Esqueceu sua senha?
                </h1>
                <p className="text-gray-400">
                  Digite seu e-mail e enviaremos um link para redefinir sua senha
                </p>
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

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Enviar Link de Recuperação
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};