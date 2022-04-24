import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { useContext } from 'react';
import { AppContext } from '../../global/context/appContext';
import { TAppProps } from '../../App.types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DetailedPageInfoCard } from './DetailedPageInfoCard/DetailedPageInfoCard';

const DetailedPage = () => {
  const {
    state: { detailedPageMovie },
  } = useContext(AppContext) as TAppProps;

  const navigate = useNavigate();

  useEffect(() => {
    if (!detailedPageMovie) {
      navigate('/');
    }
  }, [detailedPageMovie, navigate]);

  const pageChars: THeaderProps = {
    heading: `Movie №${detailedPageMovie?.kinopoiskId}`,
    leftBtn: 'Back to Home!',
    leftPath: '/',
  };

  return (
    <>
      <Header pageChars={pageChars} />

      {detailedPageMovie && <DetailedPageInfoCard {...detailedPageMovie} />}
    </>
  );
};

export default DetailedPage;
