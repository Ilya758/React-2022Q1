import React from 'react';
import './Preloader.styles.scss';

export default class Preloader extends React.Component {
  render() {
    return (
      <>
        <div className="preloader__container">
          <div className="preloader__thumb"></div>
        </div>
      </>
    );
  }
}
