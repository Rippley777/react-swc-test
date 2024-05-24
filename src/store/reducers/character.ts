import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api';

axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('token')}`;

export type Character = {
  user_id: string;
  id: string;
  name: string;
  level: number;
  experience_points: number;
  health: number;
  inventory: any; // TODO: Define
};

type CharacterSession = {
  location?: { x: number; y: number; z: number };
};

type CharacterState = {
  selected: Character | null;
  available: Character[];
  sessionInfo: CharacterSession;
  status: 'idle' | 'loading' | 'failed';
  error?: string;
};

const initialState: CharacterState = {
  selected: null,
  available: [],
  sessionInfo: {},
  status: 'idle',
  error: undefined,
};

export const fetchCharacters = createAsyncThunk<any>(
  'player/fetchCharacters',
  async () => {
    try {
      const response = await axios.get<any>(
        `${API_URL}/player/character/get-characters`,
      );
      if (response.status === 200) {
        return response.data;
      }
      return response;
    } catch (error: any) {
      throw new Error(
        'An error occurred that could use a less generic message',
      );
    }
  },
);

const playerSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character>) => {
      console.log('123', { action });

      state.selected = action.payload;
    },
    setCharacterLocation: (state, action: PayloadAction<any>) => {
      state.sessionInfo.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.status = 'idle';
          state.available = action.payload;
        },
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCharacter, setCharacterLocation } =
  playerSlice.actions;
export default playerSlice.reducer;
