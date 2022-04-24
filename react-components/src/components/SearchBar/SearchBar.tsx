import { useContext, useEffect } from 'react';
import { TAppProps } from '../../App.types';
import { AppContext } from '../../global/context/appContext';

const SearchBar = () => {
  const {
    commit,
    fetchData,
    handleChange,
    state: { keyword },
  } = useContext(AppContext) as TAppProps;

  useEffect(() => {
    return () => {
      commit(keyword);
    };
  }, [keyword, commit]);

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
