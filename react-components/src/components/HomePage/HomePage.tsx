import React from 'react';
import { TAppProps } from '../../App.types';
import { Header } from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { SearchBar } from '../SearchBar/SearchBar';

export class HomePage extends React.Component<TAppProps> {
  constructor(props: TAppProps) {
    super(props);
  }

  pageChars: THeaderProps = {
    heading: 'Welcome to the HomePage!',
    leftBtn: ' I want to know about AboutPage!',
    rightBtn: 'Today I am lucky!',
    leftPath: '/about',
    rightPath: '/404',
  };

  render() {
    return (
      <>
        <Header pageChars={this.pageChars} />
        <main>
          <SearchBar {...this.props} />
        </main>
      </>
    );
  }
}
