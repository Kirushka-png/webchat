import { useMediaQuery } from "react-responsive";
import { ModalWrapper } from "../../../styles/pages/Chat/Chat";
import ChatDesktop from './ChatDesktop';
import ChatMobilChat from "./ChatMobilChat";
const ChatDialog = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
    });

  return (
    <ModalWrapper>
      {isDesktop ? <ChatDesktop/> : <ChatMobilChat/>}
    </ModalWrapper>
  );
};

export default ChatDialog;
