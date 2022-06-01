import { useMediaQuery } from "react-responsive";
import { ModalWrapper } from "../../../styles/pages/Chat/Chat";
import ChatDesktop from './ChatDesktop';
import ChatMobilChat from "./ChatMobilChat";
import ChangeNameModal from 'components/pages/Chat/ChangeNameModal';
import { Context } from 'index';
import { useEffect } from "react";
import React, { useContext, useState } from "react";
import { observer } from 'mobx-react-lite';

const ChatDialog = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
    });
    const { store } = useContext(Context)

    useEffect(() => {
      console.log()
  
    }, [store.changeNameModal])
  return (
    <ModalWrapper>
      {store.changeNameModal && <ChangeNameModal/> }
      {isDesktop ? <ChatDesktop/> : <ChatMobilChat/>}
    </ModalWrapper>
  );
};

export default observer(ChatDialog);
