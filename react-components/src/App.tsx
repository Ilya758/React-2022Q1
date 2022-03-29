import React, { SyntheticEvent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Route, Routes } from 'react-router';
import { HomePage } from './components/HomePage/HomePage';
import { AboutPage } from './components/AboutPage/AboutPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PRE_URL } from './global/constants/preUrl';
import { IState, IResponse } from './App.types';
import Form from './components/FormPage/FormPage';

export class App extends React.Component {
  private static pull = (): string => {
    return JSON.parse(localStorage.getItem('input') as string) || 'Empty string!';
  };

  state: IState = {
    input: '',
    movies: null,
  };

  componentDidMount() {
    this.setState({
      input: App.pull(),
    });

    fetch(`${PRE_URL}&s=avengers`)
      .then((res: Response) => res.json())
      .then((data: IResponse) => {
        this.setState({ movies: data.Search });
      })
      .catch((err) => console.log(err));
  }

  private commit = (): void => {
    localStorage.setItem('input', JSON.stringify(this.state.input));
  };

  handleChange = (e: SyntheticEvent): void => {
    this.setState({
      input: (e.target as HTMLInputElement).value,
    });
  };

  render() {
    const state = this.state;
    const commit = this.commit;
    const handleChange = this.handleChange;
    const props = { handleChange, state, commit };

    return (
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage {...props} />} />
            <Route path="form" element={<Form />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
