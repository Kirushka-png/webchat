import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { ChatWrapper } from "styles/pages/Chat/Chat";
import ChatDeskDialogs from './ChatDeskDialogs';
import MobilDialogs from "./MobilDialogs";
import ChangeNameModal from 'components/pages/Chat/ChangeNameModal';
import { Context } from 'index';
import React, { useContext, useState } from "react";
import { observer } from 'mobx-react-lite';

const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });
  const { store } = useContext(Context)

  useEffect(() => {
    console.log()

  }, [store.changeNameModal])
  

  return (
    <ChatWrapper>
      {store.changeNameModal && <ChangeNameModal/> }
      {isDesktop ? <ChatDeskDialogs/> : <MobilDialogs/>}
    </ChatWrapper>
  );
};

export default observer(Chat);
