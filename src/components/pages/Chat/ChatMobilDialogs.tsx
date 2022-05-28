//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IDialog } from "codebase/models/IDialog";
import { IUser } from "codebase/models/IUser";
import { MenuItemSettings } from "components/pages/SettingsMenu/Menu";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as Search } from "images/Chat/Search.svg";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { Context } from "index";
import _ from "lodash";
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  DialogItem, Dialogs, DialogsUser, DialogUsers, ModalCont,
  ModalContainer,
  ModalHeader, ModalSettings, ModalText,
  ModalWrapper
} from "../../../styles/pages/Chat/ChatMobilDialogs";

const ChatMobilDialogs = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });
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
              <ModalHeader style={{ width: "90%" }}>
                <ModalSettings style={{ marginLeft: "0", width: "32px" }}>
                  <MenuItemSettings />
                </ModalSettings>
                <ModalText style={{width: "100px",fontSize: "24px",height: "40px",marginRight: "auto"}}>
                  Чаты
                </ModalText>
                <Search style={{ marginLeft: "7%", marginRight: "10px" }} />
              </ModalHeader>
            </DialogsUser>
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

export default observer(ChatMobilDialogs);
