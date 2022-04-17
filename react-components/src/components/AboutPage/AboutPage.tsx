import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';

export const AboutPage = () => {
  const pageChars: THeaderProps = {
    heading: 'Welcome to the AboutPage!',
    leftBtn: 'Back to Home!',
    rightBtn: 'Try to get luck!',
    leftPath: '/',
    rightPath: '/404',
  };

  return (
    <>
      <Header pageChars={pageChars} />
    </>
  );
};

export default AboutPage;
