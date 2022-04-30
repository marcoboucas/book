import { createSlice } from '@reduxjs/toolkit';

export const chapterSlice = createSlice({
  name: 'chapter',
  initialState: {
    title: 'Loading chapter ...',
    id: -1,
    content: [],
  },
  reducers: {
    updateChapter: (state, action) => {
      state.title = action.payload.title;
      state.id = action.payload.id;
      state.content = action.payload.content;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
