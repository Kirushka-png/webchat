//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IMessage } from 'codebase/models/IMessage';
import { IUser } from "codebase/models/IUser";
import { MenuItem } from "components/pages/Menu/Menu";
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as LineVert } from "images/Chat/LineVert.svg";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { ReactComponent as Online } from "images/Chat/Online.svg";
import UserIcon from "images/Chat/UserImg.png";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import {
  BodySmsBot, BodySmsButton, Button,
  Chat, DateContainer, Dialogs, DialogsUser, DialogUsers, ModalBody,
  ModalButtons,
  ModalCont,
  ModalContainer,
  ModalHeader, ModalMenu, ModalName, ModalSettings, ModalText, ModalWrapper, SmsInput
} from "../../../styles/pages/Chat/Chat";
const ChatMobilDesktop = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const isDesktop1 = useMediaQuery({
    query: "(min-width: 1500px)",
  });

  const [messages, setMessages] = useState<IMessage[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [messageText, setMessageText] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState()
  const { store } = useContext(Context)

  const messagesContainer = useRef<HTMLHeadingElement>(null)

  const getMessages = (msgs: string) => {
    setMessages(JSON.parse(msgs).reverse() as IMessage[])
  }

  const sendMessage = (text: string, chatID: number | undefined, file: FileReader | undefined) => {
    if(text.trim() != ''){
      store.io.emit('sendMessage', text, chatID, file)
      messagesContainer.current && (messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight)
      setMessageText('')
    }
  }

  const { id } = useParams()
  useEffect(() => {
    store.io.on('usersInChat', (users) => {
      setUsers(JSON.parse(users) as IUser[])
    })
    store.io.on('messages', (messages) => {
      getMessages(messages)
    })
    id && store.io.emit('getMessages', id.slice(1))
    

  }, [])

  return (
    <ModalWrapper>
        <ModalCont>
          <ModalContainer>
            <Chat>
              <ModalHeader>
                <ModalMenu>
                  <MenuItem />
                </ModalMenu>
                <Veronika style={{ width: "50px" }} />
                <ModalName>
                  <ModalText>{users.length != 0 ? users[0].name : 'Вероника'}</ModalText>
                  <Online style={{ marginLeft: "-10px" }} />
                </ModalName>
              </ModalHeader>
              <LineHor style={{ width: "90%" }} />
              <ModalBody ref={messagesContainer} id="chatContainer">
                {
                  messages.map((msg) => store.user.id != msg.author ? <BodySmsBot>{msg.text}<DateContainer>{`${new Date(msg.createdAt).getHours()}:${new Date(msg.createdAt).getMinutes()}`}</DateContainer></BodySmsBot> : <BodySmsButton>{msg.text}<DateContainer>{`${new Date(msg.createdAt).getHours()}:${(new Date(msg.createdAt).getMinutes() < 10 ? '0' : '') + new Date(msg.createdAt).getMinutes()}`}</DateContainer></BodySmsButton>)
                }
              </ModalBody>
              <LineHor style={{ width: "90%" }} />
              <ModalButtons>
                <Images />
                <Mic />
                <SmsInput placeholder="Введите сообщение" value={messageText} onChange={(e) => {setMessageText(e.target.value)}} onKeyPress={(e) => e.key === 'Enter' && sendMessage(messageText, id ? +id.slice(1): undefined, uploadedFiles)}/>
                <Button onClick={()=>{sendMessage(messageText, id ? +id.slice(1): undefined, uploadedFiles)}}>Отправить</Button>
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

                <ModalText style={{ marginTop: "20px" }}>{store.user.name}</ModalText>
              </DialogsUser>
              <DialogUsers>
              </DialogUsers>
            </Dialogs>
          </ModalContainer>
        </ModalCont>
    </ModalWrapper>
  );
};

export default  observer(ChatMobilDesktop);
