import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
  name: 'book',
  initialState: {
    title: 'Loading book ...',
    additionalData: {
      nextChapterDate: '2050-01-01',
      nbrPublicChapters: 0,
    },
    chapters: [],
  },
  reducers: {
    updateBook: (state, action) => {
      state.title = action.payload.title;
      state.additionalData = action.payload.additionalData;
      if (state.additionalData.nbrPublicChapters > 0) {
        state.chapters = action.payload.chapters.slice(0, state.additionalData.nbrPublicChapters);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBook } = bookSlice.actions;

export default bookSlice.reducer;
