import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { ModalWrapper } from "../../../styles/pages/Chat/Chat";
import ChatDeskDialogs from './ChatDeskDialogs';
import MobilDialogs from "./MobilDialogs";
const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });

  useEffect(() => {
    console.log(isDesktop)
  }, [isDesktop])
  

  return (
    <ModalWrapper>
      {isDesktop ? <ChatDeskDialogs/> : <MobilDialogs/>}
    </ModalWrapper>
  );
};

export default Chat;
