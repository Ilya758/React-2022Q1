import { TAppProps } from '../../App.types';
import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { TMovie, TMovies } from '../Movies/Movie/Movie.types';
import Movies from '../Movies/Movies';
import Preloader from '../Preloader/Preloader';
import SearchBar from '../SearchBar/SearchBar';

const HomePage = ({
  handleToggleModal,
  handleChange,
  commit,
  fetchData,
  state: { currentModalElement, movies, isLoading, input },
}: TAppProps) => {
  const pageChars: THeaderProps = {
    heading: 'Welcome to the HomePage!',
    leftBtn: ' I want to know about AboutPage!',
    rightBtn: 'FIll the form!',
    leftPath: '/about',
    rightPath: '/form',
  };

  const props = { handleChange, commit, fetchData, input };

  const loadingPredicate = !isLoading ? (
    <Movies
      currentModalElement={currentModalElement as TMovie}
      toggleModalCb={handleToggleModal}
      movies={movies as TMovies}
    />
  ) : (
    <Preloader />
  );

  return (
    <>
      <Header pageChars={pageChars} />
      <main>
        <SearchBar {...props} />
        {movies !== null ? loadingPredicate : null}
      </main>
    </>
  );
};

export default HomePage;
