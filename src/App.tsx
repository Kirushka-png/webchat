import Chat from 'components/pages/Chat/Chat';
import ChatDesktop from 'components/pages/Chat/ChatDesktop';
import ChatDesktopSearch from 'components/pages/Chat/ChatDesktopSearch';
import ChatMobilChat from 'components/pages/Chat/ChatMobilChat';
import ChatMobilChatSearch from 'components/pages/Chat/ChatMobilChatSearch';
import ChatMobilDialogs from 'components/pages/Chat/ChatMobilDialogs';
import ModalClear from 'components/pages/Chat/ClearModal';
import ModalDelete from 'components/pages/Chat/DeleteModal';
import Login from 'components/pages/Login/Login';
import Registration from 'components/pages/Login/Registration';
import Modal from 'components/pages/Login/RegistrationModal';
import Main from 'components/pages/Main/Main';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Htmlcontainer from 'styles/App';

//<Route path="/main/diagnostics">
//<Diagnostics />
// </Route>

export interface IUserData {
  name: string,
  login: string,
  password: string
}
export const MAIN_IP = '146.247.34.58'


const App = () => {
  const data = { name: "123", login: "123", password: "123" }

  const [chatOpened, setChatOpened] = useState(false)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const { store } = useContext(Context)

  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth().then((sse) => {
      })
    }
  }, [])

  return (
    <Htmlcontainer>
      <Routes>
        {
          store.isLoading ? <></> : !store.isAuth ? <>
            <Route path="/" element={<Navigate to="/reg" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="main/*" element={<Main userData={userData} onOpenChat={() => { setChatOpened(true) }} />} />
            <Route path="reg" element={<Registration />} />
            <Route path="modald" element={<ModalDelete />} />
            <Route path="modalc" element={<ModalClear />} />
            <Route path="modal" element={<Modal />} />
            <Route path="chatd" element={<ChatDesktop />} />
            <Route path="chatdsh" element={<ChatDesktopSearch />} />
            <Route path="chatmd" element={<ChatMobilDialogs />} />
            <Route path="chatmch" element={<ChatMobilChat />} />
            <Route path="chatmchsh" element={<ChatMobilChatSearch />} />
          </>
            : <>
              <Route path="*" element={<Navigate to="/chat" replace />} />
              <Route path="/login" element={<Navigate to="/chat" replace />} />
              <Route path="/reg" element={<Navigate to="/chat" replace />} />
              <Route path="main/*" element={<Main userData={userData} onOpenChat={() => { setChatOpened(true) }} />} />
              <Route path="chat" element={<Chat />} />
            </>
        }
      </Routes>

    </Htmlcontainer>
  );
}

export default observer(App);
