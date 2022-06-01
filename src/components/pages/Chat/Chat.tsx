import ChangeNameModal from 'components/pages/Chat/ChangeNameModal';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { ChatWrapper } from "styles/pages/Chat/Chat";
import ChatDeskDialogs from './ChatDeskDialogs';
import MobilDialogs from "./MobilDialogs";

const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });
  const { store } = useContext(Context)

  return (
    <ChatWrapper>
      {store.changeNameModal && <ChangeNameModal/> }
      {isDesktop ? <ChatDeskDialogs/> : <MobilDialogs/>}
    </ChatWrapper>
  );
};

export default observer(Chat);
