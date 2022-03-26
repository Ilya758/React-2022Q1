import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { IResponse } from './App.types';
import Movies from './components/Movies/Movies';

interface IFakeStore {
  input?: string;
}

type TKeyInStore = keyof IFakeStore;

const fakeApiData: IResponse = {
  Search: [
    {
      Poster: 'poster',
      Title: 'title',
      Type: 'title',
      Year: 'title',
      imdbID: 'title',
    },
  ],
  TotalResults: '10',
  Response: 'true',
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
  return container.querySelector('input[name="text"]') as HTMLInputElement;
};

const renderApp = () => render(<App />);

describe('app', () => {
  describe('correctly renders', () => {
    it('itself', () => {
      renderApp();
    });

    describe('- Movies-component', () => {
      renderApp();

      it('that sets movies to the state after ComponentDidMount lifecycle is calling', async () => {
        const fetch = jest.fn(async (fakeApi: string) => {
          console.log(`fetch data from the ${fakeApi}`);

          return {
            json: () => fakeApiData,
          };
        });

        // mock fetch
        const response = await fetch('fakeApi');
        const { Search } = response.json();

        // after fetch, Movies-component gets the data and renders
        render(<Movies movies={Search} />);
        screen.getAllByText(/title/i);
      });
    });
  });

  describe('router correctly works:', () => {
    describe('- with home-page', () => {
      it('- and header contains required text', () => {
        renderApp();
        expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
      });

      describe('- where there is a SearchBar', () => {
        it("it's exist and handles user written data", () => {
          const { container } = renderApp();
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
      const { container } = renderApp();
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
