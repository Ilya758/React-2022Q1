import React from 'react';
import Movie from './Movie/Movie';
import { IMovies, TMovies } from './Movie/Movie.types';
import './Movies.scss';

export default class Movies extends React.Component<IMovies> {
  movies: TMovies;

  constructor(props: IMovies) {
    super(props);
    this.movies = props.movies;
  }

  render() {
    return (
      <ul className="list movies__list">
        {this.movies.map((movie) => {
          return (
            <li key={movie.imdbID}>
              <Movie {...movie} />
            </li>
          );
        })}
      </ul>
    );
  }
}
