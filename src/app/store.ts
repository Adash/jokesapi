import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jokesReducer from '../features/Jokes/jokesSlice';

export const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
