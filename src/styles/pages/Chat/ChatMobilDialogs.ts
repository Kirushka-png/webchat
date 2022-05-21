import { Link } from 'react-router-dom';
import styled from "styled-components";
export const ModalWrapper = styled.div`
    display:flex;
    width: 100%;
    position: absolute;
    height:100%;
    top: 0;
    z-index: 99999999;
    background-color:rgba(98, 98, 98, 0.4);
`
export const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    width: 100%;
    gap:10px;
    height:70px;
    justify-content: center;
    align-items:center;
    padding:20px;   
`

export const ModalName = styled.div`
    display:flex;
    flex-direction:column;
    width: 20%;
    justify-content: center;
    align-items:center;
    margin-right: auto;
    gap:10px;
    height:100%;
`
export const ModalSettings = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:flex-end;
    margin-left: auto;
    gap:10px;
`
export const ModalContainer = styled.div`
    display:flex;
    flex-direction:row;
    width: 70%;
    position:fixed;
    height: 80%;
    justify-content: center;
    align-items:center;
    background-color: #FFFFFF;
    box-shadow: 0px -20px 40px -15px rgba(0, 0, 0, 0.05), 0px 20px 40px -15px rgba(0, 0, 0, 0.05);
    border-radius: 19px;
    @media (max-width:1500px) {
        width: 80%;
        height: 80%;
    }
    @media (max-width:1200px) {
        width: 80%;
        height: 80%;
    }
    @media (max-width:1200px) {
        width: 90%;
        height: 80%;
        min-height:600px;
        
    }
    @media (max-height:950px) {
        height: 90%;
        width: 80%;
    }
`

export const ModalText = styled.text`
    font-size: 24px;
    text-align:center;
    @media (max-width:800px) {
        font-size: 16px;
        height:15px;
    }   
`
export const ModalMiniText = styled.text`
    font-size: 12px;  
    width: 50%; 
    text-align:center; 
`
export const ModalCont = styled.div`
    height: 100vh;
    width: 100%;
    position: sticky;
    justify-content: center;
    align-items:center;
    display: flex;
`
export const DialogLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: black;
`
export const Dialogs = styled.div`
    height: 100%;
    width: 100%;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center;
    display: flex;
`

export const DialogsUser = styled.div`
    width: 100%;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center;
    display: flex;
    
`
export const DialogUsers = styled.div`
    display:flex;
    flex-direction:column;
    width: 90%;
    gap:20px;
    //justify-content: flex-end;
    align-self: center;
    align-items:center;

    margin-top:25px;
    margin-bottom:25px;
    overflow-y: auto;
    ::-webkit-scrollbar {
        background-color:#fff;
        width:16px
    }
    ::-webkit-scrollbar-track {
        background-color:#fff
    }
    ::-webkit-scrollbar-track:hover {
        background-color:#f4f4f4
    }
    ::-webkit-scrollbar-thumb {
        background-color:#babac0;
        border-radius:16px;
        border:5px solid #fff
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color:#a0a0a5;
        border:4px solid #f4f4f4
    }
    ::-webkit-scrollbar-button {display:none}
`

export const DialogItem = styled.div`
    width: 100%;
    flex-direction:row;
    gap: 30px;
    justify-content: flex-start;
    align-items:center;
    cursor: pointer;
    display: flex;
    :hover{
        background-color: #5496FF33;
    }
`