//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { useState, useEffect, useContext } from 'react'
import UserCard from './userCard/UserCard'
import { IUser } from "codebase/models/IUser";
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
import { observer } from 'mobx-react-lite'
import UserService from 'codebase/services/UserService';
import {
  BodySmsBot,
  BodySmsButton,
  Button,
  Chat,
  Dialogs,
  ModalBody,
  ModalButtons,
  ModalCont,
  ModalContainer,
  ModalHeader,
  ModalName,
  ModalText,
  ModalWrapper,
  ModalSettings,
  DialogsUser,
  ModalMenu,
  SmsInput,
  DialogItem,
  DialogItemCheck,
  DialogUsers,
} from "../../../styles/pages/Chat/Chat";

import { MenuItem } from "components/pages/Menu/MenuChat";
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { Context } from 'index';
import { ReactComponent as ArrowLeft } from "images/Chat/ArrowLeft.svg";

const ChatMobilDesktop = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 998px)",
  });

  const isDesktop1 = useMediaQuery({
    query: "(min-width: 1500px)",
  });

  const [users, setUsers] = useState<IUser[]>([])

  const { store } = useContext(Context)

  async function getUsers(){
    try {
        const response = await UserService.fetchUsers()
        console.log(response)
        setUsers(response.data)
    } catch (error) {
        console.log(error)
    }
}
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <ModalWrapper>
        <ModalCont>
          <ModalContainer>
            <Chat>
              <ModalHeader>
              <ArrowLeft style={{ width: "50px", marginLeft: "40px", marginRight: "-40px" }} />
                <ModalMenu>     
                  <MenuItem/>
                </ModalMenu>
                <Veronika style={{ width: "50px" }} />
                <ModalName>
                  <ModalText style={{ margin: "0px" }}>Вероника</ModalText>
                  <Online style={{ marginLeft: "-10px" }} />
                </ModalName>
              </ModalHeader>
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
                {
                  users.map((user, index) => <UserCard key={index} user={user}></UserCard>)
                }
              </DialogUsers>
            </Dialogs>
          </ModalContainer>
        </ModalCont>
    </ModalWrapper>
  );
};

export default  observer(ChatMobilDesktop);
