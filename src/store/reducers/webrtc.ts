import { createSlice } from '@reduxjs/toolkit';

const locations = createSlice({
  name: 'locations',
  initialState: {
    userLocations: {},
    connected: false,
  },
  reducers: {
    setUserLocations: (state, action) => {
      state.userLocations = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
  },
});

export const { setUserLocations, setConnected } = locations.actions;
export default locations.reducer;
