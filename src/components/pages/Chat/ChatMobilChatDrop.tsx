//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as LineVert } from "images/Chat/LineVert.svg";
import { ReactComponent as Online } from "images/Chat/Online.svg";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as Menu } from "images/Chat/Justify.svg";
import { ReactComponent as Send } from "images/Chat/Send.svg";
import { ReactComponent as Settings } from "images/Chat/Gear.svg";
import UserIcon from "images/Chat/UserImg.png";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { useMediaQuery } from "react-responsive";
import {
  BodySmsBot,
  BodySmsButton,
  Button,
  Chat,
  ModalBody,
  ModalButtons,
  ModalCont,
  ModalContainer,
  ModalHeader,
  ModalName,
  ModalText,
  ModalWrapper,
  ModalMenu,
  SmsInput,
  ModalSettings,
} from "../../../styles/pages/Chat/ChatMobilChat";

import { MenuItem } from "components/pages/Menu/Menu";
import { ReactComponent as ArrowLeft } from "images/Chat/ArrowLeft.svg";

const ChatMobilDrop = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const isDesktop1 = useMediaQuery({
    query: "(min-width: 600px)",
  });

  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <Chat>
            <ModalButtons>
              {!isDesktop1 ? (
                <ArrowLeft style={{ width: "40px" }} />
              ) : (
                <Search style={{ width: "30px", height: "30px" }} />
              )}
              {!isDesktop1 ? (
                <SmsInput placeholder="Поиск" />
              ) : (
                <SmsInput placeholder="Поиск по истории сообщений" />
              )}
              {!isDesktop1 ? (
                <Search style={{ width: "30px", marginLeft: "10px" }} />
              ) : (
                <Button style={{ width: "100px" }}>Поиск</Button>
              )}
              {isDesktop1 && <Button style={{ width: "100px" }}>Отмена</Button>}
            </ModalButtons>

            <LineHor style={{ width: "90%" }} />
            <ModalBody id="chatContainer">
              <BodySmsBot>Привет, как дела?</BodySmsBot>
              <BodySmsButton>Привет, все отлично, как ты?</BodySmsButton>
            </ModalBody>
            <LineHor style={{ width: "90%" }} />
            <ModalButtons>
              <Images style={{ width: "30px", height: "30px" }} />
              <Mic style={{ width: "30px", height: "30px" }} />
              <SmsInput placeholder="Введите сообщение" />
              {!isDesktop1 ? (
                <Send style={{ width: "30px", height: "30px" }} />
              ) : (
                <Button>Отправить</Button>
              )}
            </ModalButtons>
          </Chat>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  );
};

export default ChatMobilDrop;
