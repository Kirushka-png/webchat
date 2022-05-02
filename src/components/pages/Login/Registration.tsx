import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { LoginBlock, LoginButton, LinkButton, LoginContainer, LoginImage, LoginInput, LoginRegistr, LoginRegistrText, LoginText, LoginWrapper, NameInput, PasswordInput, PasswordWrapper, ShowIcon } from 'styles/pages/Login/Registration';
import RegistrationModal from '../../../components/pages/Login/RegistrationModal'
import Cookies from '../../../codebase/Cookies'
import { MAIN_IP } from "../../../App";

    const Registration = () => {

        const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
        const [name, setName] = useState<string>('')
        const [login, setLogin] = useState<string>('')
        const [password, setPassword] = useState<string>('')
        const [repeatPassword, setRepeatPassword] = useState<string>('')
        const [inputType, setInputType] = useState("password")
        const [inputTypeRepeat, setInputTypeRepeat] = useState("password")
      
        const onReg = () => {
          if (name.replace( /\s/g, "") && login.replace( /\s/g, "") && password.replace( /\s/g, "") && repeatPassword.replace( /\s/g, "") && password === repeatPassword) {
            fetch(process.env.NODE_ENV == 'development' ? "/registrationNewUser" : `http://${MAIN_IP}:5000/registrationNewUser`, {
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
                if (!data.error) {
                  Cookies.setCookie('login', login)
                  Cookies.setCookie('password', password)
                  setModalIsOpen(true)
                }
                else {
                  alert(data.message)
                }
              });
          }
          else 
          {
            console.log('Данные нормальные впишите)')
          }
        }
      
        const isDesktop = useMediaQuery({
          query: "(min-width: 1200px)"
        });
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
                <NameInput placeholder='Имя' value={name} onChange={(e) => setName(e.target.value.replace( /\s/g, ""))} />
                <LoginInput placeholder='Логин' value={login} onChange={(e) => setLogin(e.target.value.replace( /\s/g, ""))} />
                <PasswordWrapper>
                  <PasswordInput placeholder='Пароль' value={password} type={inputType} onChange={(e) => setPassword(e.target.value.replace( /\s/g, ""))} />
                  <ShowIcon onClick={() => setInputType(a => a.includes('password') ? 'text' : 'password')} />
                </PasswordWrapper>
                <PasswordWrapper>
                  <PasswordInput placeholder='Пароль ещё раз' value={repeatPassword} type={inputTypeRepeat} onChange={(e) => setRepeatPassword(e.target.value.replace( /\s/g, ""))} />
                  <ShowIcon onClick={() => setInputTypeRepeat(a => a.includes('password') ? 'text' : 'password')} />
                </PasswordWrapper>
                <LoginButton onClick={() => onReg()}>Зарегистрироваться</LoginButton>
              </LoginContainer>
              {isDesktop && <LoginImage />}
            </LoginBlock>
          </LoginWrapper>
        );
      }
      
      export default Registration;