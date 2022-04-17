export default class LocalStorageService {
  pull = (): string => {
    // console.log('pull from ls');
    return JSON.parse(localStorage.getItem('input') as string) || '';
  };

  commit = (input: string) => {
    // console.log('commit with input');
    localStorage.setItem('input', JSON.stringify(input));
  };
}
