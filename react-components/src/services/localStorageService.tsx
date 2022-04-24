export default class LocalStorageService {
  pull = (): string => {
    return JSON.parse(localStorage.getItem('keyword') as string) || '';
  };

  commit = (input: string) => {
    localStorage.setItem('keyword', JSON.stringify(input));
  };
}
