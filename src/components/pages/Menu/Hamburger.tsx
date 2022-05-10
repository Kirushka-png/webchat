import React from "react";
import styled from "styled-components";
import { ReactComponent as Menu } from "images/Chat/Justify.svg";
export const StyledHamburger = styled.button<{ open: boolean }>`
  left: 5vw;
  top: 7vw;
  width: 2rem;
  height: 2rem;
  background: transparent;
  margin:40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items:center;
  border: none;
  cursor: pointer;
  @media (max-width:1000px) {
    margin:20px;
    margin-right:0px;
    } 

  div {
    position: relative;
    width: 2rem;
    height: 0.15rem;
    border-radius: 10px;
    opacity: ${({ open }) =>
      open ? '1' : '0.2'};
    background-color: ${({ open }) =>
      open ? 'white' : 'black'};
  }
`;
 
type Props = {
  open: boolean,
  setOpen: (v: boolean) => void
}
 
 const Hamburger = (props: Props) => (
  <StyledHamburger
    open={props.open}
    onClick={() => props.setOpen(!props.open)}>
      <div></div>
      <div></div>
      <div></div>
  </StyledHamburger>
);

export default Hamburger;