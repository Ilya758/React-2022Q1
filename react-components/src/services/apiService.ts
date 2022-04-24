import { API_KEY } from '../global/constants/apiKey';
import { INITIAL_STATE } from '../store/initialState';

export default class ApiService {
  constructor() {}

  fetchData = async (
    url: string,
    props: Pick<typeof INITIAL_STATE, 'keyword' | 'page' | 'type'>
  ) => {
    try {
      const endpoint = new URL(url);

      const { keyword, page, type } = props;

      endpoint.searchParams.set('keyword', keyword);
      endpoint.searchParams.set('type', type);
      endpoint.searchParams.set('page', String(page));

      if (keyword.length < 2) {
        return [];
      }

      const response = await fetch(endpoint.href, {
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      return data || null;
    } catch (err) {
      console.log(err);
    }
  };
}
