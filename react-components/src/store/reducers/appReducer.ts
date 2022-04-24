import { TMovie, TMovies } from '../../components/Movies/Movie/Movie.types';
import { INITIAL_STATE } from '../initialState';
import {
  FETCH_DATA,
  INPUT_CHANGE,
  LOADING,
  PULL_DATA,
  SET_DETAILED_PAGE_MOVIE,
  TOGGLE_MODAL,
} from './actionCreators';

export interface IAction {
  type: string;
  payload?: TPayloadUnion;
  meta?: string;
}

export type TPayloadUnion = TPayloadString | TPayloadMovies | TMovie;

export type TPayloadString = string;

export type TPayloadMovies = TMovies;

export type TPayloadMovie = TMovie;

export const appReducer = (state = INITIAL_STATE, { type, payload, meta }: IAction) => {
  switch (type) {
    case PULL_DATA: {
      return {
        ...state,
        keyword: payload as TPayloadString,
      };
    }

    case LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_DATA: {
      return {
        ...state,
        isLoading: false,
        movies: payload as TPayloadMovies,
      };
    }

    case INPUT_CHANGE: {
      return {
        ...state,
        [meta as keyof typeof state]: payload as TPayloadString,
      };
    }

    case TOGGLE_MODAL: {
      const movie = payload as TMovie;

      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
        currentModalElement: movie || null,
      };
    }

    case SET_DETAILED_PAGE_MOVIE: {
      return {
        ...state,
        detailedPageMovie: payload as TPayloadMovie,
      };
    }

    default: {
      return state;
    }
  }
};
