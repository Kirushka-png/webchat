//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IDialog } from 'codebase/models/IDialog';
import { IUser } from 'codebase/models/IUser';
import ChatDialog from 'components/pages/Chat/chatDialog/ChatDialog';
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { Context } from 'index';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useMemo, useState } from 'react';
import { SmsInput } from "styles/pages/Chat/Chat";
import {
  DialogLink, Dialogs, DialogsUser, DialogUsers, DialogWrapper, ModalCont,
  ModalContainer,
  ModalHeader, ModalSettings, ModalText, ModalWrapper
} from "styles/pages/Chat/ChatMobilDialogs";



const ChatDeskDialogs = () => {

  const [dialogs, setDialogs] = useState<IDialog[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [search, setSearch] = useState<string>('')

  const { store } = useContext(Context)

  const setChats = (chats: string) => {
    let dialogs = JSON.parse(chats) as IDialog[]
    dialogs.forEach((dialog) => {
      if(dialog.private){
        dialog.name = dialog.name.split('/').filter(name => name !== store.user.name)[0]
      }
    })
    setDialogs(dialogs)
  }

  const setAllUsers = (users: string) => {
    let tempusers = JSON.parse(users) as IUser[]
    setUsers(tempusers)
  }

  const getAllUsers = useMemo(() => _.debounce((text: string) => store.io.emit('getAllUsers', text),500),[])

  const createNewChat = (userID: number) =>{
    store.io.emit('createChat', userID)
    setSearch('')
  }

  useEffect(() => {
    search != '' ? getAllUsers(search) : setUsers([])
  }, [search])

  useEffect(() => {
    store.io.on('message', message => {
      console.log(message)
    })
    store.io.on('chats', setChats)
    store.io.on('users', users =>{
      setAllUsers(users)
    })
    store.io.emit('getChats')
    return () => {
      store.io.off('chats', setChats)
    }
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
                <SmsInput placeholder="Поиск собеседника" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                <ModalSettings >
                  <MenuItemSettings />
                </ModalSettings>
              </ModalHeader>

            </DialogsUser>
            <DialogUsers>
              {
                users.length != 0 && search != '' ? 
                users.map((user,index) => <DialogWrapper onClick={()=>createNewChat(user.id)}><ChatDialog key={index} name={`${user.name}@${user.login}`}/></DialogWrapper>)
                :
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
