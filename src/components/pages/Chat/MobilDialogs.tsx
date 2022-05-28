//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IDialog } from "codebase/models/IDialog";
import { IUser } from "codebase/models/IUser";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { Context } from "index";
import _ from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import { SmsInput } from "styles/pages/Chat/Chat";
import { ModalButtons, ModalSettings } from "styles/pages/Chat/ChatMobilChat";
import {
  DialogLink, Dialogs, DialogUsers, DialogWrapper, ModalCont,
  ModalContainer, ModalWrapper
} from "styles/pages/Chat/ChatMobilDialogs";
import { MenuItemSettings } from "../SettingsMenu/Menu";
import ChatDialog from "./chatDialog/ChatDialog";

const MobilDialogs = () => {

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
            <ModalButtons>
              <ModalSettings style={{ marginLeft: "0", width: "32px" }}>
                  <MenuItemSettings />
                </ModalSettings>
                <SmsInput placeholder="Поиск чата" style={{ marginTop: "0px" }} value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                <Search style={{ width: "30px", marginLeft: "10px" }} />
            </ModalButtons>
            <LineHor style={{ width: "90%" }} />
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

export default MobilDialogs;
