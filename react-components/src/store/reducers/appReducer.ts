import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse, IState } from '../../App.types';
import { TMovie, TMovies } from '../../components/Movies/Movie/Movie.types';
import ApiService from '../../services/apiService';
export interface IAction {
  type: string;
  payload?: TPayloadUnion;
  meta?: string;
}

export type TPayloadUnion = TPayloadString | TPayloadMovies | TMovie;

export type TPayloadString = string;

export type TPayloadMovies = TMovies;

export type TPayloadMovie = TMovie;

export type InputChange = { name: string; meta: string };

export const initialState: IState = {
  keyword: '',
  page: '1',
  quantity: '0',
  type: 'ALL',
  movies: null,
  isLoading: false,
  modalIsOpen: false,
  currentModalElement: null,
  detailedPageMovie: null,
};

export const fetchDataFromApi = createAsyncThunk(
  'appReducer/fetchData',
  async (
    {
      url,
      keyword,
      quantity,
      type,
      page,
    }: {
      url: string;
      keyword: string;
      quantity: string;
      type: string;
      page: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { fetchData } = new ApiService();

      const response = await fetchData(url, { keyword, page, type });

      const { items } = (await (response as Response).json()) as IResponse;

      const filteredItems =
        !!quantity && +quantity && items ? items.filter((_, ndx) => ndx <= +quantity - 1) : items;

      return filteredItems || null;
    } catch (err) {
      rejectWithValue((err as Error).message);
    }
  }
);

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    pullData: (state, { payload }: PayloadAction<TPayloadString>) => {
      state.keyword = payload as TPayloadString;
    },

    loading: (state) => {
      state.isLoading = true;
    },

    inputChange: (state, { payload: { name, meta } }: PayloadAction<InputChange>) => {
      const key = name as keyof Pick<IState, 'quantity' | 'keyword' | 'page' | 'type'>;

      state[key] = meta as TPayloadString;
    },

    toggleModal: (state, { payload }: IAction) => {
      const movie = payload as TMovie;

      state.modalIsOpen = !state.modalIsOpen;
      state.currentModalElement = movie || null;
    },

    setDetailedPageMovie: (state, { payload }: PayloadAction<TMovie>) => {
      state.detailedPageMovie = payload as TMovie;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchDataFromApi['fulfilled'], (state, action) => {
        state.isLoading = false;
        state.movies = action.payload as unknown as TPayloadMovies;
      })
      .addCase(fetchDataFromApi['pending'], (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataFromApi['rejected'], (_, action) => {
        console.log(action.payload as string);
      }),
});

export const { inputChange, loading, pullData, setDetailedPageMovie, toggleModal } =
  appReducer.actions;
export default appReducer.reducer;
