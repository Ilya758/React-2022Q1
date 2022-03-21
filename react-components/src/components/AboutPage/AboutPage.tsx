import React from 'react';
import { Header } from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';

export class AboutPage extends React.Component {
  pageChars: THeaderProps = {
    heading: 'Welcome to the AboutPage!',
    leftBtn: 'Back to Home!',
    rightBtn: 'Try to get luck!',
    leftPath: '/',
    rightPath: '/404',
  };

  render() {
    return (
      <>
        <Header pageChars={this.pageChars} />
      </>
    );
  }
}
