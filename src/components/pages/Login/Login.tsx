import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { LoginBlock, LinkButton, LoginButton, LoginContainer, LoginImage, LoginInput, LoginRegistr, LoginRegistrText, LoginText, LoginWrapper, PasswordInput, PasswordWrapper, ShowIcon } from 'styles/pages/Login/Login';
import Cookies from 'codebase/Cookies'
import { MAIN_IP } from "App";

const Login = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)"
  });

  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [inputType, setInputType] = useState<string>('password')
  const onLogin = () => {
    if (login && password) {
      fetch(process.env.NODE_ENV == 'development' ? "/acceptLogin" : `http://${MAIN_IP}:5000/acceptLogin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ login, password })
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.error) {
            Cookies.setCookie('login', login)
            Cookies.setCookie('password', password)
            window.location.href = '/main'
          }
        });
    }
  }

  return (
    <LoginWrapper>
      <LoginBlock>
        <LoginContainer>
          <LoginRegistr>
            <LinkButton to='../login'><LoginRegistrText>Вход</LoginRegistrText></LinkButton>
            <LinkButton to='../reg'><LoginRegistrText>Регистрация</LoginRegistrText></LinkButton>
          </LoginRegistr>
          <LoginText>Мы скучали!</LoginText>
          <LoginRegistr>Войдите, чтобы продолжить</LoginRegistr>
          <LoginInput placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value.replace( /\s/g, ""))} />
          <PasswordWrapper>
            <PasswordInput placeholder='Пароль' value={password} type={inputType} onChange={(e) => setPassword(e.target.value.replace( /\s/g, ""))} />
            <ShowIcon onClick={() => setInputType(a => a.includes('password') ? 'text' : 'password')}/>
          </PasswordWrapper>
          <LoginButton onClick={() => onLogin()}>Войти</LoginButton>
        </LoginContainer>
        {isDesktop && <LoginImage></LoginImage>}
      </LoginBlock>
    </LoginWrapper>
  );
}

export default Login;
