import { TMovie } from './Movie.types';
import './Movie.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { setDetailedPageMovie } from '../../../store/reducers/appReducer';

const Movie = ({ nameOriginal, posterUrl, type, year, kinopoiskId, ratingImdb }: TMovie) => {
  const dispatch = useAppDispatch();

  const setMovie = () =>
    dispatch(
      setDetailedPageMovie({ nameOriginal, posterUrl, type, year, kinopoiskId, ratingImdb })
    );

  return (
    <div className="card">
      <Link onClick={setMovie} className="card__link" to={`movies/${kinopoiskId}`}>
        <img className="card__img" src={posterUrl} alt={nameOriginal} />

        <div className="card__content">
          <h1>{nameOriginal}</h1>
          <h3>Year: {year}</h3>
          <h3>Type: {type}</h3>
        </div>
      </Link>
    </div>
  );
};
export default Movie;
