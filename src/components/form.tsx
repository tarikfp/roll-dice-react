import * as React from 'react';
import '../styles/roll-dice.css';

type Props = {
  onSubmit: () => void;
  handleChange: (val: string) => void;
  value: string;
  isRolling: boolean;
  isSubmitButtonDisabled: boolean;
};

const Form: React.FC<Props> = ({
  handleChange,
  onSubmit,
  value,
  isRolling,
  isSubmitButtonDisabled,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number of dice:
          <input
            type="number"
            value={value}
            height="60px"
            onChange={(e) => handleChange(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className={isRolling ? 'RollDice-rolling' : undefined}
          disabled={isSubmitButtonDisabled}
        >
          {isRolling ? 'Rolling' : 'Roll Dice!'}
        </button>
      </form>
    </div>
  );
};

export default Form;
