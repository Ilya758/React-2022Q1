/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage/HomePage';
import { AboutPage } from './components/AboutPage/AboutPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PRE_URL } from './global/constants/preUrl';
import Form from './components/FormPage/FormPage';
import LocalStorageService from './services/localStorageService';
import { AppContext } from './global/context/appContext';
import DetailedPage from './components/DetailedPage/DetailedPage';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchDataFromApi, inputChange, pullData } from './store/reducers/appReducer';

const App = () => {
  const { commit, pull } = new LocalStorageService();

  const dispatch = useAppDispatch();

  const { keyword, page, type, quantity } = useAppSelector(({ appReducer }) => appReducer);

  useEffect(() => {
    const previousInput = pull();

    dispatch(pullData(previousInput));
  }, []);

  const fetchData = (e: React.KeyboardEvent) => {
    if (e.code.match(/Enter/i)) {
      const options = { keyword, page, type, quantity };

      dispatch(
        fetchDataFromApi({
          url: PRE_URL,
          ...options,
        })
      );
    }
  };

  const handleChange = (e: SyntheticEvent): void => {
    const { value, name } = e.target as HTMLInputElement;

    dispatch(inputChange({ name, meta: value }));
  };

  const extractMethods = () => {
    return {
      commit,
      handleChange,
      fetchData,
    };
  };
  const value = { ...extractMethods(), dispatch };

  return (
    <AppContext.Provider value={value}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="form" element={<Form />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/movies/:id" element={<DetailedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
