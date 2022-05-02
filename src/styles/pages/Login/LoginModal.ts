import styled from "styled-components";
import { Link } from 'react-router-dom'

export const ModalWrapper = styled.div`
    display:flex;
    width: 100%;
    position: absolute;
    height:100%;
    top: 0;
    background-color:rgba(98, 98, 98, 0.4);
`
export const ModalContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
    width: 25%;
    position:fixed;
    height:40%;
    justify-content: center;
    align-items:center;
    background-color: #FFFFFF;
    box-shadow: 0px -20px 40px -15px rgba(0, 0, 0, 0.05), 0px 20px 40px -15px rgba(0, 0, 0, 0.05);
    border-radius: 19px;
    @media (max-width:1500px) {
        width: 35%;
        height:40%;
    }
    @media (max-width:1200px) {
        width: 40%;
        height:40%;
    }
    @media (max-width:1000px) {
        width: 45%;
    }
    @media (max-width:800px) {
        width: 55%;
    }
    @media (max-width:600px) {
        width: 65%;
    }
    @media (max-width:450px) {
        width: 80%;
        height:50%;
        gap:25px;
    }
`

export const ModalText = styled.text`
    font-size: 30px;
    @media (max-width:900px) {
        font-size: 20px;
    }   
`
export const ModalMiniText = styled.text`
    font-size: 16px;  
    width: 50%; 
    text-align:center; 
    @media (max-width:800px) {
        width: 80%;
    } 
`
export const ModalButton = styled.a`
    width: 60%;
    height: 45px;
    font-size: 12px; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: #FF9254;
    border-radius: 8px;
    color: white;
    border:0;
    @media (max-width:900px) {
        width: 80%;
    } 
`
export const ModalCont = styled.div`
    height: 100vh;
    width: 100%;
    position: sticky;
    justify-content: center;
    align-items:center;
    display: flex;
`