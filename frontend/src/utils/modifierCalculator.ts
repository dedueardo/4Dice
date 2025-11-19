import type { Attributes } from '../types';

/**
 * Calcula o modificador de um atributo
 */
export function calculateModifier(attributeValue: number): number {
  return Math.floor((attributeValue - 10) / 2);
}

/**
 * Calcula todos os modificadores dos atributos
 */
export function calculateAllModifiers(attributes: Attributes) {
  return {
    strength: calculateModifier(attributes.strength),
    dexterity: calculateModifier(attributes.dexterity),
    constitution: calculateModifier(attributes.constitution),
    intelligence: calculateModifier(attributes.intelligence),
    wisdom: calculateModifier(attributes.wisdom),
    charisma: calculateModifier(attributes.charisma),
  };
}

/**
 * Formata modificador com sinal + ou -
 */
export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

/**
 * Calcula bônus de proficiência baseado no nível
 */
export function calculateProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}