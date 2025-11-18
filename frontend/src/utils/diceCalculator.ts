import { DiceType, DiceRoll, DiceFormula, DiceTerm } from '../types';

/**
 * Rola um dado e retorna o resultado
 */
export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Rola múltiplos dados do mesmo tipo
 */
export function rollMultipleDice(quantity: number, diceType: DiceType): number[] {
  const sides = parseInt(diceType.substring(1));
  const results: number[] = [];
  
  for (let i = 0; i < quantity; i++) {
    results.push(rollDice(sides));
  }
  
  return results;
}

/**
 * Calcula o total de uma rolagem com modificador
 */
export function calculateRollTotal(results: number[], modifier: number = 0): number {
  const sum = results.reduce((acc, val) => acc + val, 0);
  return sum + modifier;
}

/**
 * Rola com vantagem (rola 2d20 e pega o maior)
 */
export function rollWithAdvantage(): { results: number[], total: number } {
  const results = [rollDice(20), rollDice(20)];
  const total = Math.max(...results);
  return { results, total };
}

/**
 * Rola com desvantagem (rola 2d20 e pega o menor)
 */
export function rollWithDisadvantage(): { results: number[], total: number } {
  const results = [rollDice(20), rollDice(20)];
  const total = Math.min(...results);
  return { results, total };
}

/**
 * Verifica se é um acerto crítico (20 natural)
 */
export function isCriticalHit(roll: number): boolean {
  return roll === 20;
}

/**
 * Verifica se é uma falha crítica (1 natural)
 */
export function isCriticalFail(roll: number): boolean {
  return roll === 1;
}

/**
 * Parse de fórmula de dados (ex: "2d6+1d8+3")
 */
export function parseDiceFormula(formula: string): DiceTerm[] {
  const terms: DiceTerm[] = [];
  const cleanFormula = formula.replace(/\s/g, '').toLowerCase();
  
  // Regex para encontrar termos de dados (ex: 2d6) e modificadores (ex: +3)
  const regex = /([+-]?)(\d+)?d(\d+)|([+-]?\d+)(?!d)/g;
  let match;
  
  while ((match = regex.exec(cleanFormula)) !== null) {
    if (match[2] && match[3]) {
      // É um dado (ex: 2d6)
      const quantity = parseInt(match[2] || '1');
      const diceType = `d${match[3]}` as DiceType;
      
      terms.push({
        type: 'dice',
        quantity,
        diceType,
      });
    } else if (match[4]) {
      // É um modificador (ex: +3)
      terms.push({
        type: 'modifier',
        value: parseInt(match[4]),
      });
    }
  }
  
  return terms;
}

/**
 * Executa uma fórmula de dados completa
 */
export function executeFormula(formula: string): {
  terms: DiceTerm[];
  results: Map<string, number[]>;
  total: number;
} {
  const terms = parseDiceFormula(formula);
  const results = new Map<string, number[]>();
  let total = 0;
  
  terms.forEach((term, index) => {
    if (term.type === 'dice' && term.quantity && term.diceType) {
      const rolls = rollMultipleDice(term.quantity, term.diceType);
      results.set(`term-${index}`, rolls);
      total += rolls.reduce((sum, val) => sum + val, 0);
    } else if (term.type === 'modifier' && term.value !== undefined) {
      total += term.value;
    }
  });
  
  return { terms, results, total };
}