import React from 'react';
import { TAppProps } from '../../App.types';
import { Header } from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { TMovie, TMovies } from '../Movies/Movie/Movie.types';
import Movies from '../Movies/Movies';
import Preloader from '../Preloader/Preloader';
import { SearchBar } from '../SearchBar/SearchBar';

export class HomePage extends React.Component<TAppProps> {
  constructor(props: TAppProps) {
    super(props);
  }

  pageChars: THeaderProps = {
    heading: 'Welcome to the HomePage!',
    leftBtn: ' I want to know about AboutPage!',
    rightBtn: 'FIll the form!',
    leftPath: '/about',
    rightPath: '/form',
  };

  render() {
    const {
      toggleModal,
      state: { currentModalElement, movies, isLoading },
    } = this.props;

    const loadingPredicate = !isLoading ? (
      <Movies
        currentModalElement={currentModalElement as TMovie}
        toggleModalCb={toggleModal}
        movies={movies as TMovies}
      />
    ) : (
      <Preloader />
    );

    return (
      <>
        <Header pageChars={this.pageChars} />
        <main>
          <SearchBar {...this.props} />

          {movies !== null ? loadingPredicate : null}
        </main>
      </>
    );
  }
}
