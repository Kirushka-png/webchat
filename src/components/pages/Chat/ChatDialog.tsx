import ChangeNameModal from 'components/pages/Chat/ChangeNameModal';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { ModalWrapper } from "../../../styles/pages/Chat/Chat";
import ChatDesktop from './ChatDesktop';
import ChatMobilChat from "./ChatMobilChat";

const ChatDialog = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });

  const { store } = useContext(Context)

  return (
    <ModalWrapper>
      {store.changeNameModal && <ChangeNameModal/> }
      {isDesktop ? <ChatDesktop/> : <ChatMobilChat/>}
    </ModalWrapper>
  );
};

export default observer(ChatDialog);
