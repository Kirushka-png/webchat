//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as LineVert } from "images/Chat/LineVert.svg";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import UserIcon from "images/Chat/UserImg.png";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { useMediaQuery } from "react-responsive";
import {
  BodySmsBot,
  BodySmsButton,
  Button,
  Chat, DialogItem,
  DialogItemCheck, Dialogs, DialogsUser, DialogUsers, ModalBody,
  ModalButtons,
  ModalCont,
  ModalContainer,
  ModalHeader, ModalSettings, ModalText,
  ModalWrapper, SmsInput
} from "../../../styles/pages/Chat/Chat";



const ChatMobilDesktop = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const isDesktop1 = useMediaQuery({
    query: "(min-width: 1500px)",
  });

  return (
    <ModalWrapper>
        <ModalCont>
          <ModalContainer>
            <Chat>

                <ModalButtons>
                <Search />
                <SmsInput placeholder="Поиск по истории сообщений" />
                <Button style={{ width: "100px" }}>Поиск</Button>
                <Button style={{ width: "100px" }}>Отмена</Button>
              </ModalButtons>

              <LineHor style={{ width: "90%" }} />
              <ModalBody id="chatContainer">
                <BodySmsBot>Привет, как дела?</BodySmsBot>
                <BodySmsButton>Привет, все отлично, как ты?</BodySmsButton>
              </ModalBody>
              <LineHor style={{ width: "90%" }} />
              <ModalButtons>
                <Images />
                <Mic />
                <SmsInput placeholder="Введите сообщение" />
                <Button>Отправить</Button>
              </ModalButtons>
            </Chat>
            <LineVert style={{ height: "90%" }} />
            <Dialogs>
              <DialogsUser>
                <ModalHeader>
                  <ModalSettings>
                    <MenuItemSettings />
                  </ModalSettings>
                </ModalHeader>
                {isDesktop1 ? (
                  <img
                    src={UserIcon}
                    style={{ height: "200px", width: "200px" }}
                  />
                ) : (
                  <img
                    src={UserIcon}
                    style={{ height: "150px", width: "150px" }}
                  />
                )}

                <ModalText style={{ marginTop: "20px" }}>Your Name</ModalText>
              </DialogsUser>
              <DialogUsers>
                <DialogItemCheck>
                  <Veronika style={{ width: "50px" }} />
                  <ModalText>Вероника Смирнова</ModalText>
                </DialogItemCheck>
                <DialogItem>
                  <Veronika style={{ width: "50px" }} />
                  <ModalText>Вероника Смирнова</ModalText>
                </DialogItem>
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

export default ChatMobilDesktop;
