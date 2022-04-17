import { Link } from 'react-router-dom';
import { IHeader } from './Header.types';
import './Header.scss';

const Header = ({ pageChars: { heading, leftBtn, leftPath, rightBtn, rightPath } }: IHeader) => {
  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <h1 className="card-panel orange lighten-2 center-align">{heading}</h1>
          <Link to={leftPath} className="header__link">
            {leftBtn}
          </Link>
          <Link to={rightPath} className="header__link">
            {rightBtn}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
