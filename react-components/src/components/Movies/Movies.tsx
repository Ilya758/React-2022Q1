import Modal from '../Modal/Modal';
import Movie from './Movie/Movie';
import { IMovies } from './Movie/Movie.types';
import './Movies.scss';

const Movies = ({ currentModalElement, movies, toggleModalCb }: IMovies) => {
  let modal: JSX.Element | null = null;

  if (currentModalElement) {
    const { Poster: poster, Title: title, Type: type, Year: year, imdbID } = currentModalElement;

    modal = (
      <Modal toggleModalCb={toggleModalCb}>
        <h1>{title}</h1>
        <img src={poster} alt={title} />
        <h3>Year: {year}</h3>
        <h3>Type: {type}</h3>
        <h3>IMDBid : {imdbID}</h3>
      </Modal>
    );
  }

  return (
    <>
      {modal}

      <ul onClick={toggleModalCb} className="list movies__list">
        {movies ? (
          movies.map((movie) => {
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
};

export default Movies;
