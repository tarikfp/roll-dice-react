import { MAX_DICE_AMOUNT, MIN_DICE_AMOUNT } from './constants';
import { DiceSides } from './types';

export const isValidDiceNumberInput = (
  diceNumber: number | undefined
): { isValid: boolean; msg?: string } => {
  if (typeof diceNumber === 'undefined') {
    return {
      isValid: false,
      msg: 'Please enter valid dice number',
    };
  }

  if (diceNumber <= 0) {
    return {
      isValid: false,
      msg: `Dice number must be greater than ${MIN_DICE_AMOUNT}`,
    };
  }

  if (diceNumber > MAX_DICE_AMOUNT) {
    return {
      isValid: false,
      msg: `Dice number must be less than ${MAX_DICE_AMOUNT}`,
    };
  }

  return {
    isValid: true,
  };
};

/**
 * @description
 * convert number to DiceSides enum as our component use it
 * in order to display icon
 */
export const mapDiceNumberToDiceSide: Record<number, DiceSides> = {
  1: DiceSides.ONE,
  2: DiceSides.TWO,
  3: DiceSides.THREE,
  4: DiceSides.FOUR,
  5: DiceSides.FIVE,
  6: DiceSides.SIX,
};

/**
 * @returns dice face number (1-6)
 */
export const getRolledDice = (): number => {
  const roll = Math.random();
  const diceRoll = Math.floor(roll * 6) + 1;
  return diceRoll;
};

export const generateRolledDiceNumber = (amountOfDice: number) => {
  let arr: number[] = [];
  for (const _ of Array.from({ length: amountOfDice })) {
    const rolledDice = getRolledDice();
    arr = [...arr, rolledDice];
  }
  return arr;
};
