import { IUserData } from 'App';
import Hamburger from "components/pages/Menu/Hamburger";
import { ReactComponent as Basket } from 'images/Menu/Basket.svg';
import { ReactComponent as Images } from 'images/Menu/Images.svg';
import { ReactComponent as PinAngle } from 'images/Menu/PinAngle.svg';
import { ReactComponent as Search } from 'images/Menu/Search.svg';
import { ReactComponent as XCircle } from 'images/Menu/XCircle.svg';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";



const StyledMenu = styled.nav<{ open: boolean }>`
  width: 100vw;
  left:12%;
  top: 20%;
  position: fixed;
  width:400px;
  height:300px;
  border-radius: 0 0  18px 18px;
  background-color: #5496FF;
  padding-top: 10px;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")}; 

    @media (max-width:998px) {       
    right:10%;
    top: 5%;
    width: 80%;
    height:270px;

  } 
  @media (min-width:1500px) {       
    left:17%;
    @media (max-height:950px) {        
    left:12%;
  }
  }

  @media (max-width:1200px) {       
    left:7%;
    @media (max-height:950px) {        
    left:12%;
  }
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
  @media (max-width:998px) {
    font-size: 16px;
    padding: 10px 5%;
  }      
`;
const StyledLinkTop = styled(StyledLink)`
  padding-top:30px;
  @media (max-width:998px) {
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
