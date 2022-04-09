import React from 'react';
import Modal from '../Modal/Modal';
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
    const { toggleModalCb, currentModalElement } = this.props;
    let modal: JSX.Element | null = null;

    if (currentModalElement) {
      const { Poster: poster, Title: title, Type: type, Year: year, imdbID } = currentModalElement;

      modal = (
        <Modal>
          <div onClick={toggleModalCb} className="overlay">
            <div className="content modal__content">
              <span className="modal-close__button">X</span>

              <h1>{title}</h1>
              <img src={poster} alt={title} />
              <h3>Year: {year}</h3>
              <h3>Type: {type}</h3>
              <h3>IMDBid : {imdbID}</h3>

              <div>
                <h3>Description</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum excepturi illum modi
                  dolore consequuntur impedit error.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      );
    }

    return (
      <>
        {modal}

        <ul onClick={toggleModalCb} className="list movies__list">
          {this.movies ? (
            this.movies.map((movie) => {
              return (
                <li id={movie.imdbID} key={movie.imdbID}>
                  <Movie {...movie} />
                </li>
              );
            })
          ) : (
            <h1>Nothing found!</h1>
          )}
        </ul>
      </>
    );
  }
}
