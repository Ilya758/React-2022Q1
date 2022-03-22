import React from 'react';
import { TMovie } from './Movie.types';

export default class Movie extends React.Component<TMovie> {
  constructor(props: TMovie) {
    super(props);
  }

  render() {
    const { Poster, Type, Year, Title } = this.props;

    console.log(this.props);

    return (
      <div style={{ color: 'black' }}>
        <div className="col s12 m7">
          <div className="card">
            <div className="card-image">
              <img src={Poster} />
              <span className="card-title"> {Title} </span>
            </div>
            <div className="card-content">
              <p>{Type}</p>
              <p>{Year}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
