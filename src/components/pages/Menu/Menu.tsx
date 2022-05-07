import React, { useState } from "react";
import styled from "styled-components";
import {ReactComponent as Search} from 'images/Menu/Search.svg';
import {ReactComponent as Images} from 'images/Menu/Images.svg';
import {ReactComponent as PinAngle} from 'images/Menu/PinAngle.svg';
import {ReactComponent as XCircle} from 'images/Menu/XCircle.svg';
import {ReactComponent as Basket} from 'images/Menu/Basket.svg';
import {ReactComponent as Prof} from 'images/UserCircleW.svg';
import { Link } from 'react-router-dom';
import { IUserData } from 'App';


import Hamburger from "components/pages/Menu/Hamburger";

const StyledMenu = styled.nav<{ open: boolean }>`
  width: 100vw;
  position: fixed;
  width:400px;
  height:300px;
  border-radius: 18px;
  background-color: #5496FF;
  padding-top: 70px;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")};
  @media (max-width:1000px) {
        width: 80%;
      height:270px;
      left:10%;
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
    padding-top:20px;
  } 
`;
const Icons = styled.div`
  display:flex;
  flex-direction:row;
`;

interface Props{
  userData: IUserData | null,
  onOpenChat(): any
}

export const MenuItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);

  return (
    <div>
      <StyledMenu open={open}>
        <StyledLinkTop to="" onClick={() => close()}><Search style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Поиск по сообщениям</StyledLinkTop>
        <StyledLink to="" onClick={() => close()}><Images style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Показать вложения</StyledLink>
        <StyledLink to="" onClick={() => close()}><PinAngle style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Закрепить чат</StyledLink>
        <StyledLink to="" onClick={() => close()}><Basket style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Очистить диалог</StyledLink>
        <StyledLink to="" onClick={() => close()}><XCircle style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Удалить чат</StyledLink>

      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
     </div>
   );
};
