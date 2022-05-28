import { IUserData } from 'App';
import Hamburger from "components/pages/Menu/Hamburger";
import { ReactComponent as Basket } from 'images/Menu/Basket.svg';
import { ReactComponent as Images } from 'images/Menu/Images.svg';
import { ReactComponent as PinAngle } from 'images/Menu/PinAngle.svg';
import { ReactComponent as Search } from 'images/Menu/Search.svg';
import { ReactComponent as XCircle } from 'images/Menu/XCircle.svg';
import React, { useState, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import styled from "styled-components";
import { Context } from 'index' 


const StyledMenu = styled.nav<{ open: boolean }>`
  width: 100% !important;
  position: absolute;
  z-index: 100;
  top:0;
  left:0;
  border-radius: 0 0  18px 18px;
  background-color: #5496FF;
  padding-top: 70px;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")}; 
`
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

interface Props{
  userData: IUserData | null,
  onOpenChat(): any
}

export const MenuItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const close = () => setOpen(false);
  const { id } = useParams()
  const { store } = useContext(Context)

  return (
    <div>
      <StyledMenu open={open}>
        <StyledLinkTop to="" onClick={() => close()}><Search style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Поиск по сообщениям</StyledLinkTop>
        <StyledLink to="" onClick={() => close()}><Images style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Показать вложения</StyledLink>
        <StyledLink to="" onClick={() => close()}><PinAngle style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Закрепить чат</StyledLink>
        <StyledLink to="" onClick={() => {store.io.emit('deleteMessages', id && id.slice(1)); close()}}><Basket style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Очистить диалог</StyledLink>
        <StyledLink to="" onClick={() => close()}><XCircle style={{"height" : "30px", "width" : "30px", marginRight:"30px"}}/>Удалить чат</StyledLink>

      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
     </div>
   );
};
