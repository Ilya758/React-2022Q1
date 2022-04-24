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
    <>
      <div style={{ marginTop: '2rem' }}>
        <h3>Type</h3>

        <div>
          <label style={{ marginRight: '1rem' }}>
            All
            <input onChange={handleChange} type="radio" name="type" value="ALL" defaultChecked />
          </label>
          <label style={{ marginRight: '1rem' }}>
            TV-show
            <input onChange={handleChange} type="radio" name="type" value="TV_SHOW" />
          </label>

          <label>
            Film
            <input onChange={handleChange} type="radio" name="type" value="FILM" />
          </label>
        </div>
      </div>

      <div>
        <label>
          <h3 style={{ cursor: 'pointer' }}>Page</h3>

          <input
            style={{ maxWidth: '2rem' }}
            type="number"
            className="input"
            name="page"
            min="1"
            defaultValue="1"
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          <h3 style={{ cursor: 'pointer' }}>Quantity of movies</h3>

          <input
            style={{ maxWidth: '2rem' }}
            type="number"
            min="0"
            className="input"
            name="quantity"
            defaultValue="0"
            onChange={handleChange}
          />
        </label>
      </div>

      <div style={{ margin: '30px 0' }}>
        <label>
          <h3 style={{ cursor: 'pointer' }}>Search by keyword</h3>

          <input
            name="keyword"
            onChange={handleChange}
            onKeyDown={fetchData}
            placeholder="Enter a word to find the films"
            id="text"
            type="text"
            className="input"
            value={keyword}
            autoComplete="off"
          />
        </label>
      </div>
    </>
  );
};

export default SearchBar;
