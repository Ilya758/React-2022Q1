/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useEffect, useReducer } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage/HomePage';
import { AboutPage } from './components/AboutPage/AboutPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PRE_URL } from './global/constants/preUrl';
import Form from './components/FormPage/FormPage';
import ApiService from './services/apiService';
import LocalStorageService from './services/localStorageService';
import { appReducer } from './store/reducers/appReducer';
import { INITIAL_STATE } from './store/initialState';
import {
  fetchDataFromApi,
  handleInputChange,
  pullData,
  setLoading,
  toggleModal,
} from './store/reducers/actionCreators';
import { TMovie } from './components/Movies/Movie/Movie.types';
import { IResponse } from './App.types';
import { AppContext } from './global/context/appContext';
import DetailedPage from './components/DetailedPage/DetailedPage';

const App = () => {
  const apiService = new ApiService();

  const { commit, pull } = new LocalStorageService();

  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  useEffect(() => {
    const previousInput = pull();

    dispatch(pullData(previousInput));
  }, []);

  const fetchData = (e: React.KeyboardEvent) => {
    if (e.code.match(/Enter/i)) {
      dispatch(setLoading());

      const { keyword, page, type, quantity } = state;

      apiService
        .fetchData(PRE_URL, { keyword, page, type })
        .then(({ items }: IResponse) => {
          const filteredItems =
            !!quantity && +quantity && items
              ? items.filter((_, ndx) => ndx <= +quantity - 1)
              : items;

          dispatch(fetchDataFromApi(filteredItems));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (e: SyntheticEvent): void => {
    const { value, name } = e.target as HTMLInputElement;

    dispatch(handleInputChange(value, name));
  };

  const findCurrentElementById = (id: string) =>
    state.movies?.find((movie) => movie.kinopoiskId === id);

  const handleToggleModal = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;

    if (state.modalIsOpen) {
      if (
        element.classList.contains('overlay') ||
        element.classList.contains('modal-close__button')
      ) {
        dispatch(toggleModal());
      }

      return;
    }

    switch (element.tagName) {
      case 'IMG':
      case 'DIV':
      case 'P': {
        const { id } = element.closest('li') as HTMLLIElement;

        dispatch(toggleModal(findCurrentElementById(id) as TMovie));

        break;
      }

      default:
        break;
    }
  };

  const extractMethods = () => {
    return {
      commit,
      handleChange,
      fetchData,
      handleToggleModal,
    };
  };

  const value = { state, ...extractMethods(), dispatch };

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
