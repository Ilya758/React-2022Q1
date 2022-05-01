import { IState } from '../App.types';
import { TMovies } from '../components/Movies/Movie/Movie.types';
import { API_KEY } from '../global/constants/apiKey';

export default class ApiService {
  constructor() {}

  fetchData = async (url: string, props: Pick<IState, 'keyword' | 'page' | 'type'>) => {
    const endpoint = new URL(url);

    const { keyword, page, type } = props;

    endpoint.searchParams.set('keyword', keyword);
    endpoint.searchParams.set('type', type);
    endpoint.searchParams.set('page', String(page));

    if (keyword.length < 2) {
      return [] as TMovies;
    }

    return fetch(endpoint.href, {
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
    });
  };
}
