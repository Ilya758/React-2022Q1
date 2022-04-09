import React, { SyntheticEvent } from 'react';
import { TMovies } from './components/Movies/Movie/Movie.types';

export type TResponseKeys = 'Response' | 'Search' | 'TotalResults';

export interface IResponse {
  Response: string;
  TotalResults: string;
  Search: TMovies;
}

export interface IState {
  input: string;
  movies?: TMovies | null;
}

export type TAppProps = {
  state: IState;
  commit: () => void;
  handleChange: (e: SyntheticEvent) => void;
  fetchData: (e: React.KeyboardEvent) => void;
};
