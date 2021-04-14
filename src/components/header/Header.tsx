/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line object-curly-newline
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import LogInModal from '../../components/LogInModal/LogInModal';
import { RootState } from '../../models/RootState';
import UserInfo from '../../components/UserInfo/UserInfo';

export function Header(): JSX.Element {
  const [showLogIn, setShowLogIn] = useState(false);
  const handleShowLogIn = () => setShowLogIn(true);
  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);

  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <>
      <header>
        <Navbar bg='light' expand='lg' fixed='top'>
          <Container>
            <Navbar.Brand href='#home'>RS Lang</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#book'>Учебник</Nav.Link>
                {currentUser && <Nav.Link href='#statistics'>Статистика</Nav.Link>}
                <NavDropdown title='Игры' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='#savanna'>Саванна</NavDropdown.Item>
                  <NavDropdown.Item href='#'>Аудиовызов</NavDropdown.Item>
                  <NavDropdown.Item href='#sprint'>Спринт </NavDropdown.Item>
                  <NavDropdown.Item href='#cardGame'>Карточки</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {currentUser && <UserInfo user={currentUser} />}
              {!currentUser && (
                <>
                  <Button variant='outline-secondary' onClick={handleShowLogIn}>
                    Вход
                  </Button>
                  <Button
                    variant='outline-secondary'
                    className='btn-register'
                    onClick={handleShowRegister}
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <RegisterModal show={showRegister} onShowChange={setShowRegister} />
      <LogInModal show={showLogIn} onShowChange={setShowLogIn} />
    </>
  );
}
