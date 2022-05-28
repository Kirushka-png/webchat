//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IDialog } from "codebase/models/IDialog";
import IMessage from "codebase/models/IMessage";
import { IUser } from "codebase/models/IUser";
import { MenuItem } from "components/pages/Menu/Menu";
import { ReactComponent as ArrowLeft } from "images/Chat/ArrowLeft.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as Online } from "images/Chat/Online.svg";
import UserImg from 'images/Chat/UserImg.png';
import { Context } from "index";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Chat,
  ModalBody, ModalCont,
  ModalContainer,
  ModalHeader, ModalMenu, ModalName, ModalSettings, ModalText,
  ModalWrapper
} from "../../../styles/pages/Chat/ChatMobilChat";
import InputMessageMobil from "./inputMessage/InputMessageMobil";
import MessageMobil from "./message/MessageMobil";


const ChatMobilChat = () => {


  const [dialogs, setDialogs] = useState<IDialog[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const { store } = useContext(Context)

  const messagesContainer = useRef<HTMLHeadingElement>(null)

  const getMessages = (msgs: string) => {
    setMessages(JSON.parse(msgs).reverse() as IMessage[])
  }
  const setChats = (chats: string) => {
    let dialogs = JSON.parse(chats) as IDialog[]
    dialogs.forEach((dialog) => {
      if(dialog.private){
        dialog.name = dialog.name.split('/').filter(name => name !== store.user.name)[0]
      }
    })
    setDialogs(dialogs)
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
    store.io.on('chats', setChats)
    store.io.emit('getChats')
    return(() =>{
      store.io.off('chats', setChats)
    })
  }, [id])

  return (
      
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
        <Chat>
            <ModalHeader>
              <ModalMenu>
                <NavLink to={`/chat`}>
                  <ArrowLeft style={{ width: "50px",height:"50px" }}/>
                </NavLink>
              </ModalMenu>
              <img
                  src={UserImg}
                  style={{ height: "40px", width: "40px" }}
                />
              <ModalName>
                <ModalText  style={{ margin: "0px" }}>{users.length != 0 && users[0].name}</ModalText>
                <Online style={{ marginLeft: "-10px" }} />
              </ModalName>
              <ModalSettings >    
                  <MenuItem/>
              </ModalSettings>
            </ModalHeader>
            <LineHor style={{ width: "90%" }} />
            <ModalBody ref={messagesContainer} id="chatContainer">
                {
                  messages.map((msg) => <MessageMobil msg={msg}></MessageMobil>)
                }
              </ModalBody>
            <LineHor style={{ width: "90%" }} />
            <InputMessageMobil messagesContainer={messagesContainer}></InputMessageMobil>
          </Chat>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  );
};

export default ChatMobilChat;
