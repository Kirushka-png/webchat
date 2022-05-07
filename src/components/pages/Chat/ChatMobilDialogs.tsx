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

import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";

const ChatMobilDialogs = () => {

    const isDesktop = useMediaQuery({
        query: "(min-width: 1000px)"
      });

  return (
      
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <Dialogs>
            <DialogsUser>
              <ModalHeader>
              <ModalText style={{  width: "100px",fontSize: "42px", height:"50px" }}>Чаты</ModalText>
                <ModalSettings >    
                  <MenuItemSettings/>
                </ModalSettings>
              </ModalHeader>

            </DialogsUser>
            <DialogUsers>
              <DialogItem >
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

export default ChatMobilDialogs;
