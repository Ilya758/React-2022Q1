import React from 'react';
import { Header } from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';

export class NotFoundPage extends React.Component {
  pageChars: THeaderProps = {
    heading: '404!!! Nothing found here!',
    leftBtn: 'I wanna go Home!',
    rightBtn: 'Bring me more information!',
    leftPath: '/',
    rightPath: '/about',
  };

  render() {
    return (
      <>
        <Header pageChars={this.pageChars} />
      </>
    );
  }
}
