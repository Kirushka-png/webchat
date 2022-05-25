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
    height:25%;
    gap: 30px;
    justify-content: center;
    align-items:center;
    background-color: #FFFFFF;
    box-shadow: 0px -20px 40px -15px rgba(0, 0, 0, 0.05), 0px 20px 40px -15px rgba(0, 0, 0, 0.05);
    border-radius: 19px;
    @media (max-width:1500px) {
        width: 35%;
    }
    @media (max-width:1200px) {
        width: 40%;
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
        gap:25px;
    }
`
export const ModalContainerDrop = styled(ModalContainer)`
    width: 40%;
    height: 50%;
    padding-top: 30px;
    padding-bottom: 30px;
    @media (max-width:1500px) {
        width: 50%;
    }
    @media (max-width:1200px) {
        width: 60%;
    }
    @media (max-width:1000px) {
        width: 65%;
    }
    @media (max-width:800px) {
        width: 80%;
    }

`
interface DropContainerProps {imgback:string | undefined}
export const DropContainer = styled.div`
    width: 80%;
    height: 60%; 
    display:flex;
    justify-content: center;
    align-items:center;
`
export const DropContainerImage = styled.div<DropContainerProps>`
    width: 100%;
    height: 100%;
    display:flex;
    border: ${(props:DropContainerProps)=> !props.imgback && `5px dashed #5496FF`};
    justify-content: center;
    align-items:center;
    background-image:${(props:DropContainerProps)=> props.imgback ? `url(${props.imgback})` : `none`};
    background-size:cover;
    background-position:center;
`

export const ModalText = styled.p`
    font-size: 30px;
    @media (max-width:900px) {
        font-size: 20px;
    }   
`
export const ModalMiniText = styled.p`
    font-size: 20px;  
    width: 90%; 
    text-align:center; 
    @media (max-width:800px) {
        font-size: 16px;  
    }
`
export const ModalButtonInput = styled.label`
    width: 30%;
    height: 45px;
    font-size: 16px; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: #5496FF;
    border-radius: 8px;
    color: white;
    border:0;
    @media (max-width:600px) {
        font-size: 14px; 
        width: 40%; 
    }
`
export const ModalButton = styled.a`
    width: 30%;
    height: 45px;
    font-size: 16px; 
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: #5496FF;
    border-radius: 8px;
    color: white;
    border:0;
    @media (max-width:600px) {
        font-size: 14px; 
        width: 40%; 
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
export const Buttons = styled.div`
    display: flex;
    width: 90%;
    gap:15px;
    justify-content: center;
    align-items:center;
    flex-direction:row;
`