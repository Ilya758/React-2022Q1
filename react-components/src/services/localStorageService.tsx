export default class LocalStorageService {
  pull = (): string => {
    return JSON.parse(localStorage.getItem('input') as string) || '';
  };

  commit = (input: string) => () => {
    localStorage.setItem('input', JSON.stringify(input));
  };
}
