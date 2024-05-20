import React, { useEffect } from 'react';
import {
  Character,
  setSelectedCharacter,
} from '../../../store/reducers/character';
import Button from '../../../components/ui/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';

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
  const selectedCharacter = useSelector(
    (state: RootState) => state.character.selected,
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleOnSelect = () => {
    dispatch(setSelectedCharacter(character));
    onSelect?.();
  };

  useEffect(() => {
    console.log(selectedCharacter);
    // do some logic here to verify selected character
    if (selectedCharacter) {
      window.location.href = '/game';
    }
  }, [selectedCharacter]);

  return (
    <div key={key} className="character-select-item" onClick={onSelect}>
      <h3 className="my-5">
        {character.name} - Lvl: {character.level}
      </h3>
      <Button onClick={handleOnSelect}>Enter World</Button>
    </div>
  );
};

export default CharacterSelectItem;
