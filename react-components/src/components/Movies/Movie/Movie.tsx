import { TMovie } from './Movie.types';
import './Movie.scss';

const Movie = ({ Poster, Type, Year, Title }: TMovie) => {
  return (
    <div className="card">
      <img className="card__img" src={Poster} />

      <div className="card__content">
        <p> {Title} </p>
        <p>{Type}</p>
        <p>{Year}</p>
      </div>
    </div>
  );
};
export default Movie;
