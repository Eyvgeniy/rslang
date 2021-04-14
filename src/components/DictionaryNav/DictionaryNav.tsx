import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSection, selectPage } from '../../slice/dictionary';

const sections = [
  { name: 'Изучаемые слова', class: '', id: 'learned' },
  { name: 'Сложные слова', class: '', id: 'hard' },
  { name: 'Удаленные слова', class: '', id: 'deleted' },
];

const DictionaryNav = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleChangeSection = (id) => () => {
    dispatch(selectSection(id));
    dispatch(selectPage(0));
  };

  return (
    <div className='book-nav'>
      {sections.map((section, i) => {
        // const activeClass = i === group ? `link${i + 1}-active` : '';
        return (
          <button key={i} onClick={handleChangeSection(section.id)}>
            {' '}
            {section.name}
          </button>
        );
      })}
    </div>
  );
};

export default DictionaryNav;
