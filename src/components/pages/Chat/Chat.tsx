import ChatDesktop from "components/pages/Chat/ChatDesktop";
import ChatMobilChat from "components/pages/Chat/ChatMobilChat";
import { useMediaQuery } from "react-responsive";
import { ModalWrapper } from "../../../styles/pages/Chat/Chat";

const Chat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  return (
    <ModalWrapper>
      {isDesktop ? <ChatDesktop/> : <ChatMobilDialogs/>}
    </ModalWrapper>
  );
};

export default Chat;
