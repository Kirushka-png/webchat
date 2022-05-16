import React, { useState, useContext } from "react";
import styled from "styled-components";
import {ReactComponent as PersonCircle} from 'images/SettingsImg/PersonCircle.svg';
import {ReactComponent as TextareaT} from 'images/SettingsImg/TextareaT.svg';
import {ReactComponent as XCircle} from 'images/SettingsImg/XCircle.svg';
import { Link } from 'react-router-dom';
import { IUserData } from 'App';
import { Context } from 'index'
import UserIcon from "images/Chat/UserImg.png";
import { useMediaQuery } from "react-responsive";
import Hamburger from "components/pages/SettingsMenu/Hamburger";
import {ModalText} from "../../../styles/pages/Chat/Chat";
const StyledMenu = styled.nav<{ open: boolean }>`
  width: 100vw;
  right:15%;
  position: fixed;
  width:24.5%;
  height:200px;
  border-radius: 18px;
  background-color: #5496FF;
  padding-top: 70px;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")};
  @media (max-width:1500px) {       
    right:10%;
    width:28%;
  } 

  @media (max-width:1000px) {       
    right:10%;
    top: 5%;
    width:31.5%;
    width: 80%;
    height:310px;
  }  
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 10px 10%;
  font-size: 24px;
  color: white;
  display:flex;
  align-items:center;
  height:30px;
  text-decoration: none;
  @media (max-width:1000px) {
    font-size: 16px;
    padding: 10px 5%;
  }  
`;
const StyledLinkTop = styled(StyledLink)`
  padding-top:30px;
  @media (max-width:1000px) {
    padding-top:10px;
  } 
`;
const User = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`;

interface Props{
  userData: IUserData | null,
  onOpenChat(): any
}

export const MenuItemSettings = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  const { store } = useContext(Context)
  const isDesktop1 = useMediaQuery({
    query: "(min-width: 1000px)",
  });
  return (
    <div>
      <StyledMenu open={open}>
        <User>
      {!isDesktop1 && 
        <img src={UserIcon} style={{ height: "100px", width: "100px"}}/> 
        }
      {!isDesktop1 && 
        <ModalText style={{ marginTop: "20px", color:"white", marginBottom:"20px" }}>Your Name</ModalText>
        }
        </User>
        <StyledLinkTop to="" onClick={() => close()}><TextareaT style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Сменить ник</StyledLinkTop>
        <StyledLink to="" onClick={() => close()}><PersonCircle style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Сменить аватар</StyledLink>
        <StyledLink to="" onClick={() => store.logout()}><XCircle style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Выйти</StyledLink>
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
     </div>
   );
};
