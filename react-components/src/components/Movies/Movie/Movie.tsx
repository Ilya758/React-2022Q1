import React from 'react';
import { TMovie } from './Movie.types';
import './Movie.scss';

export default class Movie extends React.Component<TMovie> {
  constructor(props: TMovie) {
    super(props);
  }

  render() {
    const { Poster, Type, Year, Title } = this.props;

    return (
      <div style={{ color: 'black' }}>
        <div className="card">
          <img className="card__img" src={Poster} />
          <div className="card__content">
            <p> {Title} </p>
            <p>{Type}</p>
            <p>{Year}</p>
          </div>
        </div>
      </div>
    );
  }
}
