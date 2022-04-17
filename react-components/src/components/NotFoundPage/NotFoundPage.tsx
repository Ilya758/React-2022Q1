import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';

export const NotFoundPage = () => {
  const pageChars: THeaderProps = {
    heading: '404!!! Nothing found here!',
    leftBtn: 'I wanna go Home!',
    rightBtn: 'Bring me more information!',
    leftPath: '/',
    rightPath: '/about',
  };

  return (
    <>
      <Header pageChars={pageChars} />
    </>
  );
};

export default NotFoundPage;
