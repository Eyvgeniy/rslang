import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Button, Form, FormControl, InputGroup, Modal, Toast } from "react-bootstrap";
// import styles from "./RegisterForm.module.scss";
import { Cookies, withCookies } from "react-cookie";
import { RootState } from "../../models/RootState";
import {createUser, signIn} from "../../slice/user"
import { Auth } from "../../AppConstants";
import { unwrapResult } from "@reduxjs/toolkit";
import { SignInResponseModel } from "../../models/User/UserModal";
import { useAppDispatch } from "../App";

interface LogInModalProps {
  cookies: Cookies;
  show: boolean;
  onShowChange: (state: boolean) => void
}

const LogInModal = ({show, onShowChange, cookies}: LogInModalProps): JSX.Element => {

    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showToastr, setShow] = useState(false);
    
    const { loading } = useSelector((state: RootState) => state.user);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try{
            const signInUser = await dispatch(signIn({email: email, password: passWord}));
            unwrapResult(signInUser);
            const model = signInUser.payload as SignInResponseModel;
            if(model){
                cookies.set(Auth.COOKIE_TOKEN, model.token);
                handleClose();
            }
        }catch(error){
            setErrorMessage(error);
            setShow(true);
        }
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(event.target.value);
    };

    const handleClose = () => onShowChange(false);

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Вход</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <InputGroup className="mb-3">
                <FormControl
                    aria-label="Default"
                    type="text"
                    value={email}
                    placeholder="Введите email"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={handleEmailChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl
                    aria-label="Default"
                    defaultValue={passWord}
                    type="password"
                    placeholder="Введите пароль"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={handlePasswordChange}
                />
            </InputGroup>
            <Toast style={{maxWidth: "none"}} className="mb-3" onClose={() => setShow(false)} show={showToastr} delay={10000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Ошибка входа</strong>
                </Toast.Header>
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
        </Modal.Body>
        <Modal.Footer>
                <Button disabled={loading} variant="secondary" onClick={handleClose}>Отмена</Button>
                <Button disabled={loading} variant="primary" onClick={handleSubmit}>Войти</Button>
        </Modal.Footer>
    </Modal>
      
  );
};

const mapStateToProps = (state: RootState, ownProps: { cookies: Cookies }) => {
  return {
    state: state,
    cookies: ownProps.cookies,
  };
};

export default withCookies(connect(mapStateToProps, null)(LogInModal));
