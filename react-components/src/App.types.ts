import React, { SyntheticEvent } from 'react';
import { TMovie, TMovies } from './components/Movies/Movie/Movie.types';

export type TResponseKeys = 'Response' | 'Search' | 'TotalResults';

export interface IResponse {
  Response: string;
  TotalResults: string;
  Search: TMovies;
}

export interface IModalProps {
  toggleModalCb?: (e: React.MouseEvent) => void;
}

export interface IState {
  input: string;
  movies?: TMovies | null;
  isLoading: boolean;
  modalIsOpen: boolean;
  currentModalElement: TMovie | null;
}

export type TAppProps = {
  state: IState;
  commit: () => void;
  handleChange: (e: SyntheticEvent) => void;
  fetchData: (e: React.KeyboardEvent) => void;
  toggleModal: (e: React.MouseEvent) => void;
};
