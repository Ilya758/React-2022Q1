import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { IResponse } from './App.types';
import Movies from './components/Movies/Movies';
import { AppContext } from './global/context/appContext';
import { INITIAL_STATE } from './store/initialState';
import { IAction } from './store/reducers/appReducer';
import { renderWithRouter } from './utils/testHelpers';

interface IFakeStore {
  input?: string;
}

type TKeyInStore = keyof IFakeStore;

const fakeApiData: IResponse = {
  items: [
    {
      kinopoiskId: '111',
      nameOriginal: '111',
      posterUrl: '111',
      ratingImdb: '111',
      type: '111',
      year: '111',
    },
  ],
  total: 1,
  totalPages: 1,
};

const fakeLocalStorage = (function () {
  let store: IFakeStore = {};

  return {
    getItem: function (key: string) {
      return store[key as TKeyInStore] || null;
    },
    setItem: function (key: string, value: string) {
      store[key as TKeyInStore] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key as TKeyInStore];
    },
    clear: function () {
      store = {};
    },
  };
})() as Storage;

beforeEach(() => {
  window.localStorage = fakeLocalStorage;
});

const getInput = (container: HTMLElement) => {
  return container.querySelector('input[name="keyword"]') as HTMLInputElement;
};

test('', () => {});

describe('app', () => {
  describe('correctly renders', () => {
    it('itself', () => {
      renderWithRouter(<App />, { route: '/' });
    });

    describe('- Movies-component', () => {
      renderWithRouter(<App />, { route: '/' });

      it('that sets movies to the state after user type a phrase to find the required film', async () => {
        const fetch = jest.fn(async (fakeApi: string) => {
          console.log(`fetch data from the ${fakeApi}`);

          return {
            json: async () => fakeApiData,
          };
        });

        const response = await fetch('fakeApi');
        const { items } = await response.json();

        const dispatch = jest.fn() as (value: IAction) => void;

        const state = INITIAL_STATE;

        const commit = jest.fn();
        const handleChange = jest.fn();
        const fetchData = jest.fn();
        const handleToggleModal = jest.fn();

        render(
          <AppContext.Provider
            value={{ dispatch, state, commit, handleChange, fetchData, handleToggleModal }}
          >
            <MemoryRouter>
              <Movies currentModalElement={null} movies={items} />
            </MemoryRouter>
          </AppContext.Provider>
        );

        screen.getAllByText(/111/i)[0];
      });
    });
  });

  describe('router correctly works:', () => {
    describe('- with home-page', () => {
      it('- and header contains required text', () => {
        renderWithRouter(<App />, { route: '/' });

        expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
      });

      describe('- where there is a SearchBar', () => {
        it("it's exist and handles user written data", () => {
          const { container } = renderWithRouter(<App />, { route: '/' });
          const input = getInput(container);

          // it is exist
          expect(input).toBeInTheDocument();

          // it changes data, which the user writes to the input
          const prevValue = input.value;
          const testWord = 'test';

          // fake-firing event
          userEvent.type(input, testWord);
          expect(prevValue).not.toBe(input.value);
        });
      });
    });

    it('- when a user try to navigate to an another page', () => {
      const { container } = renderWithRouter(<App />, { route: '/' });
      const leftBtn = container.querySelectorAll('a[href]')[0];
      const input = getInput(container);

      const commit = jest.fn(() => {
        localStorage.setItem('input', input.value);
      });

      // imitation of typing text
      const testWord = 'text';
      input.value = '';
      userEvent.type(input, testWord);

      // navigate to the AboutPage
      userEvent.click(leftBtn);

      // data set to the localStorage
      commit();
      expect(localStorage.getItem('input')).toBe('text');
      expect(screen.getByText(/AboutPage/i)).toBeInTheDocument();

      // NotFoundPage
      const rightBtn = container.querySelectorAll('a[href]')[1];
      userEvent.click(rightBtn);
      expect(screen.getByText(/404/i)).toBeInTheDocument();

      // back to HomePage
      const homeBtn = container.querySelectorAll('a[href]')[0];
      userEvent.click(homeBtn);
      expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    });
  });
});
