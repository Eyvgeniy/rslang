import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectGroup as selectBookGroup } from '../../slice/words';
import { selectGroup as selectDictionaryGroup } from '../../slice/dictionary';

const groups = [
  { name: 'Раздел 1', class: 'link1' },
  { name: 'Раздел 2', class: 'link2' },
  { name: 'Раздел 3', class: 'link3' },
  { name: 'Раздел 4', class: 'link4' },
  { name: 'Раздел 5', class: 'link5' },
  { name: 'Раздел 6', class: 'link6' },
];

interface LocationMap {
  '/book': Function;
  '/dictionary': Function;
  [key: string]: Function;
}

const locationMap: LocationMap = {
  '/book': selectBookGroup,
  '/dictionary': selectDictionaryGroup,
};

const groupMap = {
  '/book': 'bookGroup',
  '/dictionary': 'dictionaryGroup',
};

const GroupNav = (): JSX.Element => {
  const dispatch = useDispatch();
  const groupObj = useSelector((state: any) => {
    const bookGroup = state.words.group;
    const dictionaryGroup = state.dictionary.group;
    return { bookGroup, dictionaryGroup };
  });
  const { pathname } = useLocation();
  let group: number;
  if (pathname === '/book') {
    group = groupObj.bookGroup;
  } else {
    group = groupObj.dictionaryGroup;
  }
  const selectMethod = locationMap[pathname];

  const handleChangeGroup = (num: number) => () => {
    dispatch(selectMethod(num));
  };

  return (
    <div className='book-nav'>
      {groups.map((groupData, i) => {
        const activeClass = i === group ? `link${i + 1}-active` : '';
        return (
          <button
            key={i}
            className={`book-link ${groupData.class} ${activeClass}`}
            onClick={handleChangeGroup(i)}
          >
            {groupData.name}
          </button>
        );
      })}
    </div>
  );
};

export default GroupNav;
