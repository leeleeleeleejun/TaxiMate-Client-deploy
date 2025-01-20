import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  centerLocation: { lat: 36.4689627, lng: 127.1408071 },
};

const homeMapSlice = createSlice({
  name: 'homeMapSlice',
  initialState,
  reducers: {
    setCenterLocation: (state, action) => {
      state.centerLocation = action.payload;
    },
  },
});

export const { setCenterLocation } = homeMapSlice.actions;

export default homeMapSlice.reducer;
