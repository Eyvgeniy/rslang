import React from 'react';

const groups = [
  { name: 'Раздел 1', class: 'link1' },
  { name: 'Раздел 2', class: 'link2' },
  { name: 'Раздел 3', class: 'link3' },
  { name: 'Раздел 4', class: 'link4' },
  { name: 'Раздел 5', class: 'link5' },
  { name: 'Раздел 6', class: 'link6' },
];

const GroupNav = (): JSX.Element => (
  <div className="book-nav">
    {groups.map((group, i) => (
      <button key={i} className={`book-link ${group.class}`}>
        {group.name}
      </button>
    ))}
  </div>
);

export default GroupNav;
