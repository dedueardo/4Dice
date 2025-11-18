import { format, formatDistance, formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata data para exibição
 */
export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  return format(new Date(date), formatStr, { locale: ptBR });
}

/**
 * Formata data relativa (ex: "há 2 horas")
 */
export function formatRelativeDate(date: string | Date): string {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

/**
 * Formata moeda (peças de ouro)
 */
export function formatCurrency(amount: number, type: 'pp' | 'po' | 'pe' | 'pp' | 'pc' = 'po'): string {
  const symbols = {
    pp: 'PP', // Platina
    po: 'PO', // Ouro
    pe: 'PE', // Electrum
    pp: 'PP', // Prata
    pc: 'PC', // Cobre
  };
  
  return `${amount} ${symbols[type]}`;
}

/**
 * Formata peso (em libras)
 */
export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} lbs`;
}

/**
 * Abreviação de nomes longos
 */
export function truncate(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Formata duração em minutos para horas e minutos
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}