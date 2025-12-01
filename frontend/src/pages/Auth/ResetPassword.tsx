import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Dices, ArrowLeft, Check, Eye, EyeOff, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

import { authService } from '../../services';
import { Button, Input } from '../../components/common';
import { isStrongPassword } from '../../utils';

// 1. Atualizamos o Schema para exigir o Token
const resetPasswordSchema = z
    .object({
        token: z.string().min(1, 'O código de verificação é obrigatório'),
        password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Tenta pegar o token da URL caso o usuário tenha clicado no link (híbrido), 
    // mas permite edição
    const urlToken = searchParams.get('token');

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            token: urlToken || '', // Preenche se vier da URL
        }
    });

    // Se a URL mudar, atualiza o campo (opcional, bom para UX)
    useEffect(() => {
        if (urlToken) {
            setValue('token', urlToken);
        }
    }, [urlToken, setValue]);

    const password = watch('password');
    const passwordStrength = password ? isStrongPassword(password) : null;

    const requirements = [
        { re: /.{8,}/, label: 'Senha deve ter no mínimo 8 caracteres' },
        { re: /[a-z]/, label: 'Senha deve conter letras minúsculas' },
        { re: /[A-Z]/, label: 'Senha deve conter letras maiúsculas' },
        { re: /[^A-Za-z0-9]/, label: 'Senha deve conter caracteres especiais' },
    ];

    const onSubmit = async (data: ResetPasswordForm) => {
        setIsLoading(true);
        try {
            // Envia o token digitado manualmente e a nova senha
            await authService.resetPassword(data.token, data.password);
            toast.success('Senha redefinida com sucesso!');
            navigate('/login');
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || 'Código inválido ou expirado.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
            <div className="relative w-full max-w-md">
                <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">

                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao login
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
                            <Dices className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Redefinir Senha
                        </h1>
                        <p className="text-gray-400">
                            Insira o código recebido por e-mail e sua nova senha
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* CAMPO DE TOKEN (CÓDIGO) */}
                        <Input
                            type="text"
                            label="Código de Verificação"
                            placeholder="Cole o código aqui (ex: a1b2c3)"
                            error={errors.token?.message}
                            leftIcon={<KeyRound className="w-5 h-5" />}
                            {...register('token')}
                        />

                        <div className="space-y-2">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                label="Nova Senha"
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

                            {/* Barra de Progresso */}
                            {password && passwordStrength && (
                                <div className="flex gap-1 mt-2 mb-2 px-1">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded-full transition-colors ${passwordStrength.errors.length >= 5 - level
                                                ? 'bg-gray-600'
                                                : passwordStrength.errors.length === 3
                                                    ? 'bg-red-500'
                                                    : passwordStrength.errors.length === 2
                                                        ? 'bg-yellow-500'
                                                        : passwordStrength.errors.length === 1
                                                            ? 'bg-blue-500'
                                                            : 'bg-green-500'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Requisitos */}
                            <div className="space-y-1 px-1">
                                {requirements.map((req, index) => {
                                    const isValid = req.re.test(password || '');
                                    if (isValid) return null;

                                    const colorClass = password ? 'text-red-400' : 'text-gray-500';
                                    const dotColor = password ? 'bg-red-400' : 'bg-gray-500';

                                    return (
                                        <div key={index} className={`flex items-center gap-2 text-xs transition-colors duration-200 ${colorClass}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ml-0.5 mr-1 ${dotColor}`} />
                                            <span>{req.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Confirmar Nova Senha"
                            placeholder="••••••••"
                            error={errors.confirmPassword?.message}
                            leftIcon={<Lock className="w-5 h-5" />}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            }
                            {...register('confirmPassword')}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={isLoading}
                        >
                            Alterar Senha
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};