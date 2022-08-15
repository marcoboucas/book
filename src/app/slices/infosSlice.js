import { createSlice } from '@reduxjs/toolkit';

export const infosSlice = createSlice({
  name: 'infos',
  initialState: {
    elements: [],
  },
  reducers: {
    updateBookInfos: (state, action) => {
      state.elements = action.payload.elements;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBookInfos } = infosSlice.actions;

export default infosSlice.reducer;
