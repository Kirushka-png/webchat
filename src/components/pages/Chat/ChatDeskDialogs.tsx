//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import ChatDialog from 'components/pages/Chat/chatDialog/ChatDialog';
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { SmsInput } from "styles/pages/Chat/Chat";
import {
  DialogLink, Dialogs, DialogsUser, DialogUsers, ModalCont,
  ModalContainer,
  ModalHeader, ModalSettings, ModalText,
  ModalWrapper
} from "styles/pages/Chat/ChatMobilDialogs";
interface IDialog {
  id: number
  admin: number
  private: boolean
  name: string
}


const ChatDeskDialogs = () => {

  const [dialogs, setDialogs] = useState<IDialog[]>([])

  const { store } = useContext(Context)

  const setChats = (chats: MessageEvent<any>) => {
    setDialogs(JSON.parse(chats.data) as IDialog[])
  }

  useEffect(() => {
    store.sse.addEventListener('getChats', setChats);
    return () => {store.sse.removeEventListener('getChats',setChats)}
  }, [])

  return (

    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <Dialogs>
            <DialogsUser>
              <ModalHeader>
                <ModalText style={{ width: "100px", fontSize: "42px", height: "50px", marginLeft: "5%" }}>Чаты</ModalText>
                <Search style={{ marginLeft: "7%", marginRight: "10px" }} />
                <SmsInput placeholder="Поиск собеседника" />
                <ModalSettings >
                  <MenuItemSettings />
                </ModalSettings>
              </ModalHeader>

            </DialogsUser>
            <DialogUsers>
              {
                dialogs.map((dialog, index) => <DialogLink to={`/chat/:${dialog.id}`}><ChatDialog key={index} name={dialog.name}/></DialogLink>)
              }
            </DialogUsers>
          </Dialogs>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  );
};

export default observer(ChatDeskDialogs);
