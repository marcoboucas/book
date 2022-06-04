import { createSlice } from '@reduxjs/toolkit';

export const chapterSlice = createSlice({
  name: 'chapter',
  initialState: {
    infos: {
      title: 'Loading chapter ...',
      id: -1,
      tagsInfos: {},
    },
    content: '',
  },
  reducers: {
    updateChapter: (state, action) => {
      state.infos = action.payload.infos;
      state.content = action.payload.content;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
