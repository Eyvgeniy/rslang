import React from 'react';
import { useSelector } from 'react-redux';
import './BookNav.css';

const BookNav = (): JSX.Element => {
  const user = useSelector((state: any) => state.user.currentUser);
  return (
    <div className='book-nav'>
      <a className='btn btn-outline-secondary' href='#book'>Учебник</a>
      {user && <a className='btn btn-outline-secondary' href='#dictionary'>Словарь</a>}
    </div>
  );
};

export default BookNav;
