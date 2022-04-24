import { TMovie } from '../../Movies/Movie/Movie.types';

export const DetailedPageInfoCard = (detailedPageMovie: TMovie | null) => {
  let card: JSX.Element;

  if (!detailedPageMovie) {
    return null;
  } else {
    const { kinopoiskId, nameOriginal, posterUrl, ratingImdb, type, year } =
      detailedPageMovie as TMovie;
    card = (
      <div>
        <h1>{nameOriginal}</h1>
        <img src={posterUrl} alt={nameOriginal} />
        <h3>Year: {year}</h3>
        <h3>Raiting IMDB: {ratingImdb}</h3>
        <h3>Type: {type}</h3>
        <h3>IMDBid : {kinopoiskId}</h3>
      </div>
    ) as JSX.Element;
  }

  return card;
};
