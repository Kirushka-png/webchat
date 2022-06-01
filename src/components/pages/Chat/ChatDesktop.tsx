//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IDialog } from 'codebase/models/IDialog';
import { IMessage } from 'codebase/models/IMessage';
import { IUser } from "codebase/models/IUser";
import Message from 'components/pages/Chat/message/Message';
import MenuChat from "components/pages/Menu/MenuChat";
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as ArrowLeft } from "images/Chat/ArrowLeft.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as LineVert } from "images/Chat/LineVert.svg";
import { ReactComponent as Online } from "images/Chat/Online.svg";
import UserImg from "images/Chat/UserImg.png";
import { Context } from 'index';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { NavLink, useParams } from "react-router-dom";
import {
  Chat, Dialogs, DialogsUser, DialogUsers, ModalBody, ModalCont,
  ModalContainer,
  ModalHeader, ModalMenu, ModalName, ModalSettings, ModalText,
  ModalWrapper
} from "styles/pages/Chat/Chat";
import { DialogLink } from 'styles/pages/Chat/ChatMobilDialogs';
import ChatDialog from './chatDialog/ChatDialog';
import InputMessage from './inputMessage/InputMessage';

const ChatDesktop = () => {

  const isDesktop1 = useMediaQuery({
    query: "(min-width: 1500px)",
  });

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
                <NavLink to={`/chat`}>
                  <ArrowLeft style={{ width: "50px", marginLeft: "40px", marginRight: "-40px" }} />
                </NavLink>
                <ModalMenu>     
                  <MenuChat/>
                </ModalMenu>
                <img
                  src={UserImg}
                  style={{ height: "50px", width: "50px" }}
                />
                <ModalName>
                  <ModalText>{id && (_.find(dialogs,{id: +(id.slice(1))}))?.name }</ModalText>
                  <Online style={{ marginLeft: "-10px" }} />
                </ModalName>
              </ModalHeader>
              <LineHor style={{ width: "90%" }} />
              <ModalBody ref={messagesContainer} id="chatContainer">
                {
                  messages.map((msg) => <Message msg={msg}></Message>)
                }
              </ModalBody>
              <LineHor style={{ width: "90%" }} />
              <InputMessage messagesContainer={messagesContainer}/>
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
                    src={UserImg}
                    style={{ height: "200px", width: "200px" }}
                  />
                ) : (
                  <img
                    src={UserImg}
                    style={{ height: "150px", width: "150px" }}
                  />
                )}

                <ModalText style={{ marginTop: "20px" }}>{store.user.name}</ModalText>
              </DialogsUser>
              <DialogUsers>
                {
                  dialogs.map((dialog) => <DialogLink to={`/chat/:${dialog.id}`}><ChatDialog name={dialog.name}></ChatDialog></DialogLink>)
                }
              </DialogUsers>
            </Dialogs>
          </ModalContainer>
        </ModalCont>
    </ModalWrapper>
  );
};

export default  observer(ChatDesktop);
