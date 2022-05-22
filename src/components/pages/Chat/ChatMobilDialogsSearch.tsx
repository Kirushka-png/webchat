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
  ModalText,
  ModalWrapper,
  DialogItem,
  DialogUsers,
} from "../../../styles/pages/Chat/ChatMobilDialogs";
import {
  Button,
  ModalButtons,
  SmsInput,
} from "../../../styles/pages/Chat/ChatMobilChat";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as ArrowLeft } from "images/Chat/ArrowLeft.svg";
const ChatMobilDialogsSearch = () => {
  const isDesktop1 = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <Dialogs>
          <ModalButtons style={{padding:"30px"}}>
              {!isDesktop1 ? (
                <ArrowLeft style={{ width: "40px" }} />
              ) : (
                <Search style={{ width: "30px", height: "30px" }} />
              )}
              {!isDesktop1 ? (
                <SmsInput placeholder="Поиск" />
              ) : (
                <SmsInput placeholder="Поиск по диалогам" />
              )}
              {!isDesktop1 ? (
                <Search style={{ width: "30px", marginLeft: "10px" }} />
              ) : (
                <Button style={{ width: "100px" }}>Поиск</Button>
              )}
              {isDesktop1 && <Button style={{ width: "100px" }}>Отмена</Button>}
            </ModalButtons>
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

export default ChatMobilDialogsSearch;
