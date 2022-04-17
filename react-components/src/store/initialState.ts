import { IState } from '../App.types';

export const INITIAL_STATE: IState = {
  input: '',
  movies: null,
  isLoading: false,
  modalIsOpen: false,
  currentModalElement: null,
};
