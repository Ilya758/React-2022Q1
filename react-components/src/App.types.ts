import { SyntheticEvent } from 'react';
import { TMovies } from './components/Movies/Movie/Movie.types';

export type TResponseKeys = 'Response' | 'Search' | 'TotalResults';

export type TResponse = {
  [key in TResponseKeys]: string;
};

export interface IState {
  input: string;
  movies?: TMovies;
}

export type TAppProps = {
  state: IState;
  commit: () => void;
  handleChange: (e: SyntheticEvent) => void;
};
