import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { jokeType } from './jokesAPI';

interface JokesState {
  totalCount: number;
  jokesList: [jokeType] | [];
  categories: [string] | [];
}

const initialState: JokesState = {
  totalCount: 0,
  jokesList: [],
  categories: [],
};

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setJokesList: (state, action: PayloadAction<[jokeType] | []>) => {
      state.jokesList = action.payload;
    },
    setCategories: (state, action: PayloadAction<[string] | []>) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setTotalCount,
  setJokesList,
  setCategories,
} = jokesSlice.actions;

// export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
//   setTimeout(() => {
//     dispatch(setSearchString(amount));
//   }, 1000);
// };
export const selectTotalCount = (state: RootState) => state.jokes.totalCount;
export const selectJokesList = (state: RootState) => state.jokes.jokesList;
export const selectCategories = (state: RootState) => state.jokes.categories;

export default jokesSlice.reducer;
