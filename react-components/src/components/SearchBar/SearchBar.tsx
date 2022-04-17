import { useEffect } from 'react';
import { TSearchProps } from '../../App.types';

const SearchBar = (props: TSearchProps) => {
  const { handleChange, commit, fetchData, input } = props;

  useEffect(() => {
    return () => {
      commit(input);
    };
  }, [input, commit]);

  return (
    <div style={{ margin: '30px 0' }}>
      <input
        name="text"
        onChange={handleChange}
        onKeyDown={fetchData}
        placeholder="Enter a word to find the films"
        id="text"
        type="text"
        className="input"
        value={input}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
