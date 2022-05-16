import styled from "styled-components";
import { Link } from 'react-router-dom'

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
    width: 90%;
    gap:10px;
    justify-content: center;
    align-items:center;
    height:70px;
    padding:20px;   
`
export const ModalBody = styled.div`
    display:flex;
    flex-direction:column;
    width: 90%;
    gap:20px;
    //justify-content: flex-end;
    align-self: center;
    align-items:flex-start;
    height:65%;
    padding:10px;
    margin:20px;
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
export const BodySmsBot = styled.div`
    display:flex;
    flex-direction:column;
    max-width:90%;
    font-size:18px;
    justify-content: center;
    align-items:flex-start;
    padding:10px;
    background-color: #F6F6F9;
    border-radius: 15px 15px 15px 0px;
    @media (max-width:800px) {
    font-size:14px;
    } 
`
export const BodySmsButton = styled.div`
    display:flex;
    flex-direction:column;
    max-width:90%;
    font-size:18px;
    justify-content: center;
    align-items:flex-start;
    padding:10px;
    background-color: #FFE9DD;
    align-self:flex-end;
    border-radius: 15px 15px 0px 15px;
    @media (max-width:800px) {
    font-size:14px;
    } 
`
export const ModalName = styled.div`
    display:flex;
    flex-direction:column; 
    width: 30%;
    justify-content: center;
    align-items:center;
    margin-right: auto;
    gap:10px;
    height:100%;
`
export const ModalMenu = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:flex-start;
    margin-right: auto;
    gap:10px;
    height:100%;
    width:10%;
    width: 30%;
`

export const ModalButtons = styled.div`
    display:flex;
    flex-direction:row;
    width: 90%;
    justify-content: space-around;
    align-items:center;
    padding:35px;
 
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
export const Button = styled.button`
    width: 150px;
    height: 50px;
    font-size: 16px; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5496FF;
    color:white;
    text-decoration: none;
    cursor: pointer;
    border: 1.5px solid #5496FF;
    border-radius: 11px;
    user-select: none;
    @media (max-width:600px) {
        width: 40px; 
        height: 40px;
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
export const Chat = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items:center;
`

export const SmsInput = styled.input`
    width: 50%;
    height: 45px;
    font-size: 14px;
    padding-left:2%;
    background-color: inherit;
    cursor: pointer;
    border: 2px solid #5496FF;
    border-radius: 11px;
    border-radius: 8px;
    @media (max-width:1200px) {
        width: 50%;
    }
    @media (max-width:800px) {
        width: 40%; 
    }
    @media (max-width:600px) {
        width: 50%; 
        height: 40px;
    }
`
export const ModalSettings = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:flex-end;
    margin-left: auto;
    gap:10px;
    width: 30%;
`
export const ImagesCont = styled(ModalBody)`
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-content:flex-start;
    row-gap:10px;
    column-gap:10px;
    height:80%;
    flex-wrap:wrap;
    @media (max-width:800px) {
        row-gap:5px;
        column-gap:5px;
    }
`

export const Images = styled.div`
    height:30%;
    width: 30%;
    align-self:flex-start;
    background-color: red;
    @media (max-width:800px) {
        width: 48%; 
    }
`