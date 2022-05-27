import { useMediaQuery } from "react-responsive";
import { ModalWrapper } from "../../../styles/pages/Chat/Chat";
import ChatDeskDialogs from './ChatDeskDialogs';
import ChatMobilDialogs from "./ChatMobilDialogs";
const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });

  return (
    <ModalWrapper>
      {isDesktop ? <ChatDeskDialogs/> : <ChatMobilDialogs/>}
    </ModalWrapper>
  );
};

export default Chat;
