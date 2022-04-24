import { TMovie } from './Movie.types';
import './Movie.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../global/context/appContext';
import { TAppProps } from '../../../App.types';
import { setDetailedPageMovie } from '../../../store/reducers/actionCreators';

const Movie = ({ nameOriginal, posterUrl, type, year, kinopoiskId, ratingImdb }: TMovie) => {
  const { dispatch } = useContext(AppContext) as TAppProps;

  const setMovieToDetailedPage = () => {
    dispatch(
      setDetailedPageMovie({ nameOriginal, posterUrl, type, year, kinopoiskId, ratingImdb })
    );
  };

  return (
    <div className="card">
      <Link onClick={setMovieToDetailedPage} className="card__link" to={`movies/${kinopoiskId}`}>
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
