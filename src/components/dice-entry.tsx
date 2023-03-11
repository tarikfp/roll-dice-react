import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import '../styles/dice.css';
import { DiceSides } from '../types';

type Props = {
  face: DiceSides;
  rolling: boolean;
};

const DiceEntry: React.FC<Props> = ({ face, rolling }) => {
  return (
    <div className="Dice-container">
      <FontAwesomeIcon
        icon={['fas', `fa-dice-${face}`] as any}
        className={`Dice
            ${rolling && 'Dice-shaking'}`}
      />
    </div>
  );
};

export default DiceEntry;
