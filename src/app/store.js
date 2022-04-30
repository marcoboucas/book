import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import ChapterReducer from './slices/chapterSlice';

export default configureStore({
  reducer: {
    book: bookReducer,
    chapter: ChapterReducer,
  },
});
