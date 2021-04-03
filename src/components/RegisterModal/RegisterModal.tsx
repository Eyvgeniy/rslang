import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button, Form, FormControl, InputGroup, Modal, Toast } from 'react-bootstrap';
// import styles from "./RegisterForm.module.scss";
import { Cookies, withCookies } from 'react-cookie';
import { RootState } from '../../models/RootState';
import { createUser, signIn } from '../../slice/user';
import { Auth } from '../../AppConstants';
import { unwrapResult } from '@reduxjs/toolkit';
import { SignInResponseModel, UserModel } from '../../models/User/UserModal';
import { useAppDispatch } from '../App';

interface RegisterFormProps {
  cookies: Cookies;
  show: boolean;
  onShowChange: (state: boolean) => void;
}

const RegisterModal = ({ show, onShowChange, cookies }: RegisterFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToastr, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const { loading } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const validity = form.checkValidity();
    setValidated(true);
    if (!validity) {
      return;
    }

    const fileData = new FormData();
    fileData.append('file', file);
    fileData.append('name', userName);
    fileData.append('email', email);
    fileData.append('password', passWord);
    try {
      const createUserResult = await dispatch(createUser(fileData));
      unwrapResult(createUserResult);
      const { id } = createUserResult.payload as UserModel;
      if (id) {
        try {
          const signInUser = await dispatch(signIn({ email: email, password: passWord }));
          unwrapResult(signInUser);
          const model = signInUser.payload as SignInResponseModel;
          if (model) {
            cookies.set(Auth.COOKIE_TOKEN, model.token);
            handleClose();
          }
        } catch (error) {
          setErrorMessage(error);
          setShow(true);
        }
      }
    } catch (error) {
      setErrorMessage(error);
      setShow(true);
    }
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleClose = () => onShowChange(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Регистрация нового пользователя</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className='mb-3' controlId='formName'>
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              aria-label='Default'
              type='text'
              placeholder='Введите имя пользователя'
              value={userName}
              aria-describedby='inputGroup-sizing-default'
              required
              onChange={handleUserNameChange}
            />
            <Form.Control.Feedback type='invalid'>
              Пожалуйста, введите имя пользователя
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email адрес</Form.Label>
            <Form.Control
              type='email'
              aria-label='Default'
              value={email}
              placeholder='Введите е-мейл'
              aria-describedby='inputGroup-sizing-default'
              required
              onChange={handleEmailChange}
            />
            <Form.Control.Feedback type='invalid'>Пожалуйста, введите e-мейл</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              aria-label='Default'
              value={passWord}
              type='password'
              placeholder='Введите пароль'
              aria-describedby='inputGroup-sizing-default'
              onChange={handlePasswordChange}
              required
            />
            <Form.Control.Feedback type='invalid'>Пожалуйста, введите пароль</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.File label='Выберете фото' onChange={handleChange} />
          </Form.Group>
          <Toast
            style={{ maxWidth: 'none' }}
            className='mb-3'
            onClose={() => setShow(false)}
            show={showToastr}
            delay={10000}
            autohide
          >
            <Toast.Header>
              <strong className='mr-auto'>Ошибка регистрации</strong>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button type='submit' disabled={loading} variant='primary'>
            Ок
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state: RootState, ownProps: { cookies: Cookies }) => {
  return {
    state: state,
    cookies: ownProps.cookies,
  };
};

export default withCookies(connect(mapStateToProps, null)(RegisterModal));
