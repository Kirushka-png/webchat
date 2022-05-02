import styled from "styled-components";
import { Link } from 'react-router-dom'
import image from "images/regImg.png"; 
import image600 from "images/regImg_600.png"; 
import { ReactComponent as Show } from 'images/Show.svg'

export const LoginWrapper = styled.div`
    display:flex;
    width: 100%;
    justify-content: center;
    padding-top:50px;
    padding-bottom:50px;
    @media (max-width:800px) {
        padding-top:20px;
        padding-bottom:20px;
    }
`
export const LoginBlock = styled.div`
    display:flex;
    width: 70%;
    height: 70vh;
    min-height:500px;
    flex-direction:row;
    background: #FFFFFF;
    box-shadow: 0px -20px 40px -15px rgba(0, 0, 0, 0.05), 0px 20px 40px -15px rgba(0, 0, 0, 0.05);
    border-radius: 19px;
    @media (max-width:1200px) {
        width: 80%;
        height: 80vh;
    }
    @media (max-width:1200px) {
        width: 90%;
        height: 80vh;
        min-height:700px;
        background-image:url(${image600});
        background-repeat: no-repeat; 
        background-size: cover;
        flex-direction:column;
    }
`
export const LoginRegistr = styled.div`
    display:flex;
    flex-direction:row;
    margin-left:10%;
    font-size: 18px;
    gap:40px;    
    @media (max-width:800px) {
        font-size: 14px; 
    }
`
export const LinkButton = styled(Link)`
    text-decoration: none;
    color: inherit;
`

export const LoginContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
    padding-top:30px;
    justify-content: center;
    gap:15px;
    align-items: flex-start;
    @media (max-width:1200px) {
        justify-content: flex-end;
    }

`
export const LoginImage = styled.div`
    display:flex;
    flex:1;
    flex-direction:row;
    background-image:url(${image});
    background-repeat: no-repeat; 
    background-size: cover;
    background-position: center; 
    border-radius: 0px 19px 19px 0px;
`
export const LoginInput = styled.input`
    width: 50%;
    height: 45px;
    font-size: 14px;
    margin-left:10%;
    padding-left:2%;
    background-color: rgba(150, 150, 150, 0.1);
    border:0;
    border-radius: 8px;
    @media (max-width:1200px) {
        width: 60%;
    }
    @media (max-width:800px) {
        width: 78%;
        margin-left:10%;
        margin-right:10%;
    }
`
export const NameInput = styled.input`
    width: 50%;
    height: 45px;
    font-size: 14px;
    margin-left:10%;
    margin-top:40px;
    padding-left:2%;
    background-color: rgba(150, 150, 150, 0.1);
    border:0;
    border-radius: 8px;
    @media (max-width:1200px) {
        width: 60%;
    }
    @media (max-width:800px) {
        width: 78%;
        margin-left:10%;
        margin-right:10%;
        margin-top:20px;
    }
`
export const PasswordInput = styled.input`
    user-select: none;
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding-left:4%;
    background-color: rgba(150, 150, 150, 0.1);
    border:0;
    border-radius: 8px;
    @media (max-width:800px) {
        padding-left:3%;
    }
`
export const PasswordWrapper = styled.div`
    position: relative; 
    height: 45px;
    margin-left:10%;
    width: 50%;
    @media (max-width:1200px) {
        width: 60%;
    }
    @media (max-width:800px) {
        width: 78%;
        margin-left:10%;
        margin-right:10%;
    }
`
export const ShowIcon = styled(Show)`
    position: absolute;
    right: 7px;
    top: 11px;
    stroke: #969696;
`
export const LoginText = styled.text`
    font-size: 40px;
    font-weight:600;
    margin-left:10%;
    margin-top:20px;    
    @media (max-width:800px) {
        margin-top:20px;  
        font-size: 30px;
    }
`
export const LoginRegistrText = styled.text`
    font-size: 18px;    
    @media (max-width:800px) {
        font-size: 14px; 
    }
`
export const LoginButton = styled.button`
    cursor: pointer;
    width: 52%;
    margin-left:10%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: #FF9254;
    border-radius: 8px;
    color: white;
    border:0;
    margin-bottom:50px;
    @media (max-width:1200px) {
        width: 62%;
    }
    @media (max-width:800px) {
        width: 80%;
        margin-left:10%;
        margin-right:10%;
    }
`
export const LoginButtonRed = styled(LoginButton)`
    color:red;
`
export default LoginWrapper;