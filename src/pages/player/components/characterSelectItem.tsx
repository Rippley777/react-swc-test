import React from 'react';
import {
  Character,
  setSelectedCharacter,
} from '../../../store/reducers/character';
import Button from '../../../components/ui/buttons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';

interface CharacterSelectItemProps {
  key: string;
  character: Character;
  onSelect: () => void;
}

const CharacterSelectItem: React.FC<CharacterSelectItemProps> = ({
  key,
  character,
  onSelect,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOnSelect = () => {
    dispatch(setSelectedCharacter(character));
    onSelect?.();
  };
  return (
    <div key={key} className="character-select-item" onClick={onSelect}>
      <h3 className="my-5">
        {character.name} - Lvl: {character.level}
      </h3>
      <Button text="Enter world" onClick={handleOnSelect} />
    </div>
  );
};

export default CharacterSelectItem;
