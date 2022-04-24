import { TMovie, TMovies } from '../../components/Movies/Movie/Movie.types';
import { INITIAL_STATE } from '../initialState';

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
    case 'appReducer/PULL_DATA': {
      return {
        ...state,
        keyword: payload as TPayloadString,
      };
    }

    case 'appReducer/LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'appReducer/FETCH_DATA': {
      return {
        ...state,
        isLoading: false,
        movies: payload as TPayloadMovies,
      };
    }

    case 'appReducer/INPUT_CHANGE': {
      return {
        ...state,
        [meta as keyof typeof state]: payload as TPayloadString,
      };
    }

    case 'appReducer/TOGGLE_MODAL': {
      const movie = payload as TMovie;

      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
        currentModalElement: movie || null,
      };
    }

    default: {
      return state;
    }
  }
};
