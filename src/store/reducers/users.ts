import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { omit } from '../../utils/obj-helpers';
import axios from 'axios';
import { API_URL } from '../../api';

type UserData = {
  email?: string;
  username?: string;
  id?: string;
  lastLogin?: Date;
};

type UserState = {
  userData: UserData | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  userData: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
    setUserDataOnLogin: (state, action) => {
      const userData: UserData = {
        ...state.userData,
        id: action.payload.id,
        email: action.payload.email,
        username: action.payload.username,
        lastLogin: new Date(),
      };
      state.userData = userData;
      state.isAuthenticated = true;
    },
    setUserPlayerData: (state, action: PayloadAction<Partial<UserData>>) => {
      if (!state.isAuthenticated || !state.userData) return;

      const userData: UserData = {
        ...action.payload,
        id: state.userData.id,
        email: action.payload.email,
        username: action.payload.username,
        lastLogin: new Date(),
      };
      state.userData = userData;
    },
    setUserProfileData: (state, action: PayloadAction<UserData>) => {
      const payload = omit(action.payload, 'email');
      const userProfileData: UserData = {
        ...state.userData,
        ...payload,
      };
      state.userData = userProfileData;
    },
  },
});

export const {
  setUserDataOnLogin,
  setUserPlayerData,
  setUserProfileData,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
