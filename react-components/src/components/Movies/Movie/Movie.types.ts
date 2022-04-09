import React from 'react';
import { IModalProps } from '../../../App.types';

export type IMoviePropKeys = 'Title' | 'Type' | 'Poster' | 'Year' | 'imdbID';

export interface IMovies extends IModalProps {
  movies: TMovies;
  toggleModalCb?: (e: React.MouseEvent) => void;
  currentModalElement: TMovie | null;
}

export type TMovies = TMovie[];

export type TMovie = {
  [key in IMoviePropKeys]: string;
};
