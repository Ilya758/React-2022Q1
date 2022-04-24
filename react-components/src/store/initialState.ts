import { IState } from '../App.types';

export const INITIAL_STATE: IState = {
  keyword: '',
  page: 1,
  quantity: 0,
  type: 'ALL',
  movies: null,
  isLoading: false,
  modalIsOpen: false,
  currentModalElement: null,
  detailedPageMovie: null,
};
