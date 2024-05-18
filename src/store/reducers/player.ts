import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api';

axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('token')}`;

type Player = {
  user_id: string;
  level: number;
  experience_points: number;
  health: number;
  inventory: any; // TODO: Define
};

type PlayerState = {
  default: Player | null;
  status: 'idle' | 'loading' | 'failed';
  error?: string;
};

const initialState: PlayerState = {
  default: null,
  status: 'idle',
  error: undefined,
};

export const fetchPlayerData = createAsyncThunk<any>(
  'player/fetchPlayerData',
  async () => {
    try {
      const response = await axios.get<any>(`${API_URL}/player/get-player`);
      if (response.data.status === 'success') {
        return response.data.data.player;
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
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPlayerData.fulfilled,
        (state, action: PayloadAction<Player>) => {
          state.status = 'idle';
          state.default = action.payload;
        },
      )
      .addCase(fetchPlayerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = playerSlice.actions;
export default playerSlice.reducer;
