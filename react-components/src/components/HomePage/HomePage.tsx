import React from 'react';
import { TAppProps } from '../../App.types';
import { Header } from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { TMovies } from '../Movies/Movie/Movie.types';
import Movies from '../Movies/Movies';
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
    return (
      <>
        <Header pageChars={this.pageChars} />
        <main>
          <SearchBar {...this.props} />
          {this.props.state.movies ? (
            <Movies movies={this.props.state.movies as TMovies} />
          ) : (
            <h1>Loading...</h1>
          )}
        </main>
      </>
    );
  }
}
