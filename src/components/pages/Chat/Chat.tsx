import ChatDesktop from "components/pages/Chat/ChatDesktop";
import ChatMobilDialogs from "components/pages/Chat/ChatMobilDialogs";
import ChatMobilChat from "components/pages/Chat/ChatMobilChat";
import { useMediaQuery } from "react-responsive";
import {ModalWrapper} from "../../../styles/pages/Chat/Chat";
const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });

  return (
    <ModalWrapper>
      {isDesktop ? <ChatDesktop/> : <ChatMobilChat/>}
    </ModalWrapper>
  );
};

export default Chat;
