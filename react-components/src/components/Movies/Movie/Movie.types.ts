export type IMoviePropKeys = 'Title' | 'Type' | 'Poster' | 'Year' | 'imdbID';

export interface IMovies {
  movies: TMovies;
}

export type TMovies = TMovie[];

export type TMovie = {
  [key in IMoviePropKeys]: string;
};
