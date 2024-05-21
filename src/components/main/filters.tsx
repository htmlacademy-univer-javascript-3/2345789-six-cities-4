import { useState } from 'react';
import { filters } from '../../const';

type FiltersProps = {
    handleSort: (choice: string) => void;
}

function Filters({handleSort}: FiltersProps): JSX.Element {
  const [filter, setFilter] = useState(filters.POPULAR);
  const [isOpened, setIsOpened] = useState(false);
  const handleFilter = (filterChoice: string) => {
    setFilter(filterChoice);
  };
  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setIsOpened((p) => !p)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {filter}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`} >
        <li className={filter === filters.POPULAR ? 'places__option places__option--active' : 'places__option'} tabIndex={0} onClick={() => {
          handleFilter(filters.POPULAR);
          handleSort(filters.POPULAR);
        }}
        >{filters.POPULAR}
        </li>
        <li className={filter === filters.LOW_TO_HIGH ? 'places__option places__option--active' : 'places__option'} tabIndex={0} onClick={() => {
          handleFilter(filters.LOW_TO_HIGH);
          handleSort(filters.LOW_TO_HIGH);
        }}
        >{filters.LOW_TO_HIGH}
        </li>
        <li className={filter === filters.HIGH_TO_LOW ? 'places__option places__option--active' : 'places__option'} tabIndex={0} onClick={() => {
          handleFilter(filters.HIGH_TO_LOW);
          handleSort(filters.HIGH_TO_LOW);
        }}
        >{filters.HIGH_TO_LOW}
        </li>
        <li className={filter === filters.TOP_RATED ? 'places__option places__option--active' : 'places__option'} tabIndex={0} onClick={() => {
          handleFilter(filters.TOP_RATED);
          handleSort(filters.TOP_RATED);
        }}
        >{filters.TOP_RATED}
        </li>
      </ul>
    </form>
  );
}

export default Filters;
