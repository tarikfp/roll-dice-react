import * as React from 'react';
import {
  PREVIOUS_REQUIRED_DICE_AMOUNT,
  ROLLING_DURATION_IN_MS,
} from '../constants';
import {
  generateRolledDiceNumber,
  isValidDiceNumberInput,
  mapDiceNumberToDiceSide,
} from '../helpers';
import '../styles/roll-dice.css';
import DiceEntry from './dice-entry';
import Form from './form';

const Dice: React.FC = () => {
  const [diceNumber, setDiceNumber] = React.useState<
    number | undefined
  >(undefined);
  const [isRolling, setRolling] = React.useState<boolean>(false);
  const [generatedDiceArr, setGeneratedDiceArr] = React.useState<
    number[]
  >([]);
  const [previousDiceArr, setPreviousDiceArr] = React.useState<
    number[]
  >([]);

  const timeoutRef = React.useRef<number | null>(null);

  const rollDice = () => {
    const result = isValidDiceNumberInput(diceNumber);

    if (!result.isValid) {
      window.alert(result.msg ?? 'Invalid dice number');
      return;
    }

    // reset input
    setDiceNumber(undefined);

    // start roll animation
    setRolling(true);

    // we've already ensured above that dice number is not undefined
    const generatedDiceArr = generateRolledDiceNumber(
      diceNumber as number
    );

    // generate dice array to be able to display DiceEntry items
    setGeneratedDiceArr(generatedDiceArr);

    // set previous dice array
    setPreviousDiceArr((prev) => {
      const computedDiceArr = [...generatedDiceArr, ...prev];
      // cut elements with the required previous dice amount from the computed array
      return computedDiceArr.slice(0, PREVIOUS_REQUIRED_DICE_AMOUNT);
    });

    // mock rolling animation with the given specific amount of time
    timeoutRef.current = setTimeout(() => {
      setRolling(false);
    }, ROLLING_DURATION_IN_MS);
  };

  React.useEffect(() => {
    return () => {
      // clear up the timeout on next render
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isSubmitButtonDisabled =
    typeof diceNumber === 'undefined' ||
    diceNumber.toString().trim() === '';

  return (
    <div className="RollDice">
      <Form
        isRolling={isRolling}
        onSubmit={rollDice}
        handleChange={(val) => setDiceNumber(Number(val))}
        value={(diceNumber ?? '').toString()}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
      />

      {generatedDiceArr.length > 0 && (
        <>
          <div>Current rolls</div>
          <div className="RollDice-container">
            {generatedDiceArr.map((diceNumber) => (
              <DiceEntry
                face={mapDiceNumberToDiceSide[diceNumber]}
                rolling={isRolling}
              />
            ))}
          </div>
        </>
      )}

      {previousDiceArr.length > 0 && (
        <>
          <div>Previous rolls</div>
          <div className="RollDice-prevContainer">
            {previousDiceArr.map((diceNumber) => (
              <DiceEntry
                face={mapDiceNumberToDiceSide[diceNumber]}
                rolling={isRolling}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dice;
