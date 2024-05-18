import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { Character, fetchCharacters } from '../../../store/reducers/character';
import CharacterSelectItem from './characterSelectItem';

interface CharacterSelectProps {}

const CharacterSelect: React.FC<CharacterSelectProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const characters: Character[] = useSelector(
    (state: RootState) => state.character.available,
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <div className="p-5">
      {characters.map((character) => (
        <CharacterSelectItem
          key={character.id}
          character={character}
          onSelect={() => console.log('handle select in parent if needed')}
        />
      ))}
    </div>
  );
};

export default CharacterSelect;
