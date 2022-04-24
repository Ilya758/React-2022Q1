import { TMovies } from '../../components/Movies/Movie/Movie.types';
import { TPayloadMovie, TPayloadString } from './appReducer';

export const PULL_DATA = 'appReducer/PULL_DATA';

export const LOADING = 'appReducer/LOADING';

export const FETCH_DATA = 'appReducer/FETCH_DATA';

export const INPUT_CHANGE = 'appReducer/INPUT_CHANGE';

export const TOGGLE_MODAL = 'appReducer/TOGGLE_MODAL';

export const SET_DETAILED_PAGE_MOVIE = 'appReducer/SET_DETAILED_PAGE_MOVIE';

export const pullData = (payload: TPayloadString) => {
  return {
    type: PULL_DATA,
    payload,
  };
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};

export const fetchDataFromApi = (payload: TMovies) => {
  return {
    type: FETCH_DATA,
    payload,
  };
};

export const handleInputChange = (payload: TPayloadString, meta: string) => {
  return {
    type: INPUT_CHANGE,
    payload,
    meta,
  };
};

export const toggleModal = (payload?: TPayloadMovie) => {
  return {
    type: TOGGLE_MODAL,
    payload,
  };
};

export const setDetailedPageMovie = (payload: TPayloadMovie) => {
  return {
    type: SET_DETAILED_PAGE_MOVIE,
    payload,
  };
};
