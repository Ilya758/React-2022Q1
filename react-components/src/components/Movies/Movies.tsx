import Modal from '../Modal/Modal';
import Movie from './Movie/Movie';
import { IMovies } from './Movie/Movie.types';
import './Movies.scss';

const Movies = ({ currentModalElement, movies, toggleModalCb }: IMovies) => {
  let modal: JSX.Element | null = null;

  if (currentModalElement) {
    const { kinopoiskId, nameOriginal, posterUrl, ratingImdb, type, year } = currentModalElement;

    modal = (
      <Modal toggleModalCb={toggleModalCb}>
        <h1>{nameOriginal}</h1>
        <img src={posterUrl} alt={nameOriginal} />
        <h3>Year: {year}</h3>
        <h3>Raiting IMDB: {ratingImdb}</h3>
        <h3>Type: {type}</h3>
        <h3>IMDBid : {kinopoiskId}</h3>
      </Modal>
    );
  }

  return (
    <>
      {modal}

      <ul onClick={toggleModalCb} className="list movies__list">
        {movies && movies.length ? (
          movies.map((movie) => {
            return (
              <li id={movie.kinopoiskId} key={movie.kinopoiskId}>
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
