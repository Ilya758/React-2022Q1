import { useAppSelector } from '../../store/store';
import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { TMovie, TMovies } from '../Movies/Movie/Movie.types';
import Movies from '../Movies/Movies';
import Preloader from '../Preloader/Preloader';
import SearchBar from '../SearchBar/SearchBar';

const HomePage = () => {
  const pageChars: THeaderProps = {
    heading: 'Welcome to the HomePage!',
    leftBtn: ' I want to know about AboutPage!',
    rightBtn: 'FIll the form!',
    leftPath: '/about',
    rightPath: '/form',
  };

  const { isLoading, currentModalElement, movies } = useAppSelector(({ appReducer }) => appReducer);

  const loadingPredicate = !isLoading ? (
    <Movies currentModalElement={currentModalElement as TMovie} movies={movies as TMovies} />
  ) : (
    <Preloader />
  );

  return (
    <>
      <Header pageChars={pageChars} />
      <main>
        <SearchBar />
        {movies !== null ? loadingPredicate : null}
      </main>
    </>
  );
};

export default HomePage;
