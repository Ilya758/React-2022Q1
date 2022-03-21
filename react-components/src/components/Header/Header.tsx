import React from 'react';
import { Link } from 'react-router-dom';
import { IHeader, THeaderProps } from './Header.types';

export class Header extends React.Component<IHeader> {
  pageChars!: THeaderProps;

  constructor(props: IHeader) {
    super(props);
    this.pageChars = props.pageChars;
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <h1 className="card-panel orange lighten-2 center-align">{this.pageChars.heading}</h1>
          <Link to={this.pageChars.leftPath} className="waves-effect waves-light btn">
            {this.pageChars.leftBtn}
          </Link>
          <Link
            style={{ marginLeft: '10px' }}
            to={this.pageChars.rightPath}
            className="waves-effect waves-light blue btn"
          >
            {this.pageChars.rightBtn}
          </Link>
        </div>
      </nav>
    );
  }
}
