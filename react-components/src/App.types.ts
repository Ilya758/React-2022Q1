import React, { SyntheticEvent } from 'react';
import { TMovie, TMovies } from './components/Movies/Movie/Movie.types';
import { IAction } from './store/reducers/appReducer';

export type TResponseKeys = 'Response' | 'Search' | 'TotalResults';

export interface IResponse {
  total: number;
  totalPages: number;
  items: TMovies;
}

export interface IModalProps {
  toggleModalCb?: (e: React.MouseEvent) => void;
}

export interface IState {
  keyword: string;
  page: number;
  quantity: number;
  type: string;
  movies?: TMovies | null;
  isLoading: boolean;
  modalIsOpen: boolean;
  currentModalElement: TMovie | null;
  detailedPageMovie: TMovie | null;
}

export type TAppProps = {
  state: IState;
  commit: (input: string) => void;
  dispatch: (value: IAction) => void;
  handleChange: (e: SyntheticEvent) => void;
  fetchData: (e: React.KeyboardEvent) => void;
  handleToggleModal: (e: React.MouseEvent) => void;
};

export type TSearchProps = {
  input: string;
  commit: (input: string) => void;
  handleChange: (e: SyntheticEvent) => void;
  fetchData: (e: React.KeyboardEvent) => void;
};
