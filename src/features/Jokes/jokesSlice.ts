import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { jokeType } from './jokesAPI';

interface JokesState {
  jokesList: [jokeType] | [];
  categories: [string] | [];
}

const initialState: JokesState = {
  jokesList: [],
  categories: [],
};

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    setJokesList: (state, action: PayloadAction<[jokeType] | []>) => {
      state.jokesList = action.payload;
    },
    setCategories: (state, action: PayloadAction<[string] | []>) => {
      state.categories = action.payload;
    },
  },
});

export const { setJokesList, setCategories } = jokesSlice.actions;

export const selectJokesList = (state: RootState) => state.jokes.jokesList;
export const selectCategories = (state: RootState) => state.jokes.categories;

export default jokesSlice.reducer;
