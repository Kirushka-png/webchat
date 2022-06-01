import { ReactComponent as Pencil } from 'images/Chat/Pencil.svg';
import { ReactComponent as Trash } from 'images/Chat/Trash.svg';
import styled from "styled-components";


export const EditPencil = styled(Pencil)`
    position: absolute;
    left: -25px;
    bottom: 8px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill-opacity: 0.2;
    :hover{
        fill-opacity: 0.5;
        fill: #5496FF;
    }
`
export const DeleteTrash = styled(Trash)`
    position: absolute;
    left: -50px;
    bottom: 8px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill-opacity: 0.2;
    :hover{
        fill-opacity: 0.5;
        fill: red;
    }
`
export const ModalWrapper = styled.div`
    width: 100%;
    height:100%;
`
export const ChatWrapper = styled.div`
    width: 100%;
    height:100%;
`
export const ModalHeader = styled.div`
    display:flex;
    flex-direction:row;
    width: 100%;
    gap:10px;
    justify-content: center;
    align-items:center;
    height:70px;
    padding:20px;  
    @media (max-width:800px) {
    }
`
export const ModalBody = styled.div`
    display:flex;
    flex-direction:column-reverse;
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
    max-width:80%;
    font-size:18px;
    position: relative;
    justify-content: center;
    align-items:flex-start;
    gap: 5px;
    padding:10px;
    background-color: #F6F6F9;
    border-radius: 15px 15px 15px 0px;
    @media (max-width:800px) {
    font-size:14px;
    } 
`
export const BodySmsButton = styled.div`
    display:flex;
    max-width:80%;
    position: relative;
    gap: 5px;
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
    width: 20%;
    justify-content: center;
    align-items:center;
    margin-right: auto;
    gap:10px;
    height:100%;
`
export const ModalMenu = styled.div`
    display:flex;
    width:7%;
    flex-direction:column;
    justify-content: center;
    align-items:flex-start;
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
    height:100%;
`
export const ModalButtons = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap: wrap;
    row-gap:20px;
    width: 90%;
    justify-content: space-around;
    align-items:center;
    padding:35px;
    @media (max-width:1200px) {
        width: 95%;
        padding:30px;
    }  
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

export const ModalText = styled.p`
    font-size: 24px;
    @media (max-width:1200px) {
        font-size: 16px;
        height:15px;
    }   
`
export const ModalMiniText = styled.p`
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
    @media (max-width:800px) {
        width: 45%;
        height: 30%;
    font-size: 12px; 
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

export const Dialogs = styled.div`
    height: 100%;
    width: 35%;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center;
    display: flex;
`
export const DateContainer = styled.div`
    height: 100%;
    text-align: end;
    align-items: end;
    display: flex;
    font-size:10px;
`
export const Chat = styled.div`
    display:flex;
    flex-direction:column;
    width: 65%;
    height: 100%;
    justify-content: flex-start;
    align-items:center;
`

export const DialogsUser = styled.div`
    height: 40%;
    width: 100%;
    flex-direction:column;
    justify-content: flex-start;
    align-items:center;
    display: flex;
    
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
        width: 78%; 
        margin-left:10%;
        margin-right:10%;
        margin-top:20px;
    }
`
export const UploadInput = styled.input`
    display: none;
`
export const UploadLabel = styled.label`
    cursor: pointer;
`

export const DialogUsers = styled.div`
    display:flex;
    flex-direction:column;
    width: 90%;
    gap:0px;
    //justify-content: flex-end;
    align-self: center;
    align-items:center;

    margin-top:50px;
    margin-bottom:50px;
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
    padding-top:20px;
    padding-bottom:20px;
    justify-content: center;
    align-items:center;
    display: flex;
`

export const DialogItemCheck = styled(DialogItem)`
    background-color:rgba(84, 150, 255, 0.2);
`