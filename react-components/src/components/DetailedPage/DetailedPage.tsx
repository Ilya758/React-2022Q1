import Header from '../Header/Header';
import { THeaderProps } from '../Header/Header.types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DetailedPageInfoCard } from './DetailedPageInfoCard/DetailedPageInfoCard';
import { useAppSelector } from '../../store/store';

const DetailedPage = () => {
  const detailedPageMovie = useAppSelector(
    ({ appReducer: { detailedPageMovie } }) => detailedPageMovie
  );

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
