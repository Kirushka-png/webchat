import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LoginBlock, LoginButton, LinkButton, LoginContainer, LoginImage, LoginInput, LoginRegistr, LoginRegistrText, LoginText, LoginWrapper, NameInput, PasswordInput, PasswordWrapper, ShowIcon } from 'styles/pages/Login/Registration';
import RegistrationModal from '../../../components/pages/Login/RegistrationModal'
import Cookies from '../../../codebase/Cookies'
import { MAIN_IP } from "../../../App";
import { Context } from "index";

const Registration = () => {

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [inputType, setInputType] = useState("password")
  const [inputTypeRepeat, setInputTypeRepeat] = useState("password")

  const onReg = () => {
    if (name.replace(/\s/g, "") && login.replace(/\s/g, "") && password.replace(/\s/g, "") && repeatPassword.replace(/\s/g, "") && password === repeatPassword) {
      fetch(process.env.NODE_ENV == 'development' ? "/api/registration" : `http://${MAIN_IP}:5000/api/registration`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, login, password })
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setModalIsOpen(true)
        })
        .catch((e) => {
          console.log(e)
        }
        )

    }
    else {
      console.log('Данные нормальные впишите)')
    }
  }

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)"
  });
  const { store } = useContext(Context)
  return (
    <LoginWrapper>
      {modalIsOpen && <RegistrationModal></RegistrationModal>}
      <LoginBlock>
        <LoginContainer>
          <LoginRegistr>
            <LinkButton to='../login'><LoginRegistrText>Вход</LoginRegistrText></LinkButton>
            <LinkButton to='../reg'><LoginRegistrText>Регистрация</LoginRegistrText></LinkButton>
          </LoginRegistr>
          <LoginText>Будем рады!</LoginText>
          <LoginRegistr>Зарегистрируйтесь, чтобы продолжить</LoginRegistr>
          <NameInput placeholder='Имя' value={name} onChange={(e) => setName(e.target.value.replace(/\s/g, ""))} />
          <LoginInput placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value.replace(/\s/g, ""))} />
          <PasswordWrapper>
            <PasswordInput placeholder='Пароль' value={password} type={inputType} onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))} />
            <ShowIcon onClick={() => setInputType(a => a.includes('password') ? 'text' : 'password')} />
          </PasswordWrapper>
          <PasswordWrapper>
            <PasswordInput placeholder='Пароль ещё раз' value={repeatPassword} type={inputTypeRepeat} onChange={(e) => setRepeatPassword(e.target.value.replace(/\s/g, ""))} />
            <ShowIcon onClick={() => setInputTypeRepeat(a => a.includes('password') ? 'text' : 'password')} />
          </PasswordWrapper>
          <LoginButton onClick={() => store.registration(name, login, password)}>Зарегистрироваться</LoginButton>
        </LoginContainer>
        {isDesktop && <LoginImage />}
      </LoginBlock>
    </LoginWrapper>
  );
}

export default Registration;