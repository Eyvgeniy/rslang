import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroup } from '../../slice/words';

const groups = [
  { name: 'Раздел 1', class: 'link1' },
  { name: 'Раздел 2', class: 'link2' },
  { name: 'Раздел 3', class: 'link3' },
  { name: 'Раздел 4', class: 'link4' },
  { name: 'Раздел 5', class: 'link5' },
  { name: 'Раздел 6', class: 'link6' },
];

const GroupNav = (): JSX.Element => {
  const dispatch = useDispatch();
  const { group } = useSelector((state: any) => state.words);

  const handleChangeGroup = (num: number) => () => {
    dispatch(selectGroup(num));
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
