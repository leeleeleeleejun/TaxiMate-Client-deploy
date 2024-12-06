import { createSlice } from '@reduxjs/toolkit';
import { defaultLocation } from '@/utils/getCurrentlocation.ts';

const centerLocation = await defaultLocation();

const initialState = {
  centerLocation,
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
