import React from 'react';
import { Link } from 'react-router-dom';
import { IHeader, THeaderProps } from './Header.types';
import './Header.scss';

export class Header extends React.Component<IHeader> {
  pageChars!: THeaderProps;

  constructor(props: IHeader) {
    super(props);
    this.pageChars = props.pageChars;
  }

  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper">
            <h1 className="card-panel orange lighten-2 center-align">{this.pageChars.heading}</h1>
            <Link to={this.pageChars.leftPath} className="header__link">
              {this.pageChars.leftBtn}
            </Link>
            <Link to={this.pageChars.rightPath} className="header__link">
              {this.pageChars.rightBtn}
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}
