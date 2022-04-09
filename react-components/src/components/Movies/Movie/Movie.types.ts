import React from 'react';

export type IMoviePropKeys = 'Title' | 'Type' | 'Poster' | 'Year' | 'imdbID';

export interface IMovies {
  movies: TMovies;
  toggleModalCb?: (e: React.MouseEvent) => void;
  currentModalElement: TMovie | null;
}

export type TMovies = TMovie[];

export type TMovie = {
  [key in IMoviePropKeys]: string;
};
