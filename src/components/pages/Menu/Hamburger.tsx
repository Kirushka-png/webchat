import React from "react";
import styled from "styled-components";
export const StyledHamburger = styled.button<{ open: boolean }>`
  position: absolute;
  top: -6px;
  left:60px;
  z-index: 200;
  width: 40px;
  height: 40px;
  background: transparent;
  margin:40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items:center;
  border: none;
  cursor: pointer;
  @media (max-width:998px) {
    left: auto;
    top: 0px;
    right:0px;
  } 

  div {
    position: relative;
    width: 2rem;
    height: 0.15rem;
    border-radius: 10px;
    opacity: ${({ open }) =>
      open ? '0.2' : '0.2'};
    background-color: ${({ open }) =>
      open ? 'black' : 'black'};
      @media (max-width:998px) {
        opacity: ${({ open }) =>
      open ? '1' : '0.2'};
    background-color: ${({ open }) =>
      open ? 'white' : 'black'};
    } 
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