import React, { SyntheticEvent } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import { HomePage } from './components/HomePage/HomePage';
import { AboutPage } from './components/AboutPage/AboutPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PRE_URL } from './global/constants/preUrl';
import { IState } from './App.types';
import Form from './components/FormPage/FormPage';
import ApiService from './services/apiService';
import LocalStorageService from './services/localStorageService';

export class App extends React.Component {
  apiService = new ApiService();

  localStorageService = new LocalStorageService();

  state: IState = {
    input: '',
    movies: null,
    isLoading: false,
    modalIsOpen: false,
    currentModalElement: null,
  };

  componentDidMount() {
    this.setState({
      input: this.localStorageService.pull(),
    });
  }

  fetchData = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      this.setState({ isLoading: true });

      this.apiService.fetchData(PRE_URL, this.state.input).then((data) => {
        this.setState({ movies: data.Search, isLoading: false });
      });
    }
  };

  private commit = (): void => {
    localStorage.setItem('input', JSON.stringify(this.state.input));
  };

  findCurrentElementById = (id: string) => this.state.movies?.find((movie) => movie.imdbID === id);

  toggleModal = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;

    if (this.state.modalIsOpen) {
      if (
        element.classList.contains('overlay') ||
        element.classList.contains('modal-close__button')
      ) {
        this.setState({
          modalIsOpen: false,
          currentModalElement: null,
        });
      }

      return;
    }

    switch (element.tagName) {
      case 'IMG':
      case 'DIV':
      case 'P': {
        const { id } = element.closest('li') as HTMLLIElement;

        this.setState({
          modalIsOpen: true,
          currentModalElement: this.findCurrentElementById(id),
        });

        break;
      }

      default:
        break;
    }
  };
  };

  render() {
    const state = this.state;
    const { isLoading } = this.state;
    const commit = this.commit;
    const handleChange = this.handleChange;
    const fetchData = this.fetchData;
    const props = { handleChange, state, commit, fetchData, isLoading };

    return (
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage {...props} />} />
          <Route path="form" element={<Form />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  }
}
