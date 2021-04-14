import React from 'react';
import { useSelector } from 'react-redux';
import './BookNav.css';

const BookNav = (): JSX.Element => {
  const user = useSelector((state: any) => state.user.currentUser);
  return (
    <div className='book-nav'>
      <a href='#book'>Учебник</a>
      {user && <a href='#dictionary'>Словарь</a>}
    </div>
  );
};

export default BookNav;
