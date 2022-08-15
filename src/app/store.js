import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import ChapterReducer from './slices/chapterSlice';
import InfosReducer from './slices/infosSlice';

export default configureStore({
  reducer: {
    book: bookReducer,
    chapter: ChapterReducer,
    infos: InfosReducer,
  },
});
