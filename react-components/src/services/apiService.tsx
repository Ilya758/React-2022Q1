export default class ApiService {
  constructor() {}

  fetchData = async (url: string, query: string) => {
    try {
      const response = await fetch(`${url}&s=${query}`);
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
}
