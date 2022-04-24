import { TMovie } from './Movie.types';
import './Movie.scss';

const Movie = ({ nameOriginal, posterUrl, type, year }: TMovie) => {
  return (
    <div className="card">
      <img className="card__img" src={posterUrl} alt={nameOriginal} />

      <div className="card__content">
        <h1>{nameOriginal}</h1>
        <h3>Year: {year}</h3>
        <h3>Type: {type}</h3>
      </div>
    </div>
  );
};
export default Movie;
