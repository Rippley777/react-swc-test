import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { omit } from '../../utils/obj-helpers';

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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userData = {
        ...state.userData,
        id: action.payload,
      };
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

export const { setUserDataOnLogin, setUserId, setUserProfileData, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
