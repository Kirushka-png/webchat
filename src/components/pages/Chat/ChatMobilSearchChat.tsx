//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as LineVert } from "images/Chat/LineVert.svg";
import { ReactComponent as Online } from "images/Chat/Online.svg";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as Menu } from "images/Chat/Justify.svg";
import { ReactComponent as Settings } from "images/Chat/Gear.svg";
import UserIcon from "images/Chat/UserImg.png";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { useMediaQuery } from "react-responsive";
import {
  Dialogs,
  ModalCont,
  ModalContainer,
  ModalHeader,
  ModalName,
  ModalText,
  ModalWrapper,
  ModalSettings,
  DialogsUser,
  DialogItem,
  DialogUsers,
} from "../../../styles/pages/Chat/ChatMobilDialogs";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { SmsInput} from "../../../styles/pages/Chat/Chat";
import {ModalButtons} from "../../../styles/pages/Chat/ChatMobilChat";
import  { ReactComponent as ArrowLeft } from "images/Chat/ArrowLeft.svg";

const ChatMobilSearchChat = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <Dialogs>

            <ModalButtons>
                <ArrowLeft style={{ width: "40px" }} />
                <SmsInput placeholder="Поиск чата" style={{ marginTop: "0px" }}/>
                <Search style={{ width: "30px", marginLeft: "10px" }} />
            </ModalButtons>
            <LineHor style={{ width: "90%" }} />
            <DialogUsers>
              <DialogItem>
                <Veronika style={{ width: "50px" }} />
                <ModalText>Вероника Смирнова</ModalText>
              </DialogItem>
              <LineHor style={{ width: "100%" }} />
              <DialogItem>
                <Veronika style={{ width: "50px" }} />
                <ModalText>Вероника Смирнова</ModalText>
              </DialogItem>
              <LineHor style={{ width: "100%" }} />
              <DialogItem>
                <Veronika style={{ width: "50px" }} />
                <ModalText>Вероника Смирнова</ModalText>
              </DialogItem>
            </DialogUsers>
          </Dialogs>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  );
};

export default ChatMobilSearchChat;
