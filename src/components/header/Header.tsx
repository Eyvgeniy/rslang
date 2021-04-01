import * as React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

export function Header(): JSX.Element {
  return (
    <header>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">RS Lang</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/#/book">Учебник</Nav.Link>
              <Nav.Link href="#link">Статистика</Nav.Link>
              <NavDropdown title="Игры" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Саванна</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Аудиовызов</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Спринт </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Карточки</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="outline-secondary">Вход</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
