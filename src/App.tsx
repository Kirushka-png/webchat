import Cookies from 'codebase/Cookies';
import Login from 'components/pages/Login/Login';
import ChatDesktop from 'components/pages/Chat/ChatDesktop';
import ChatDesktopSearch from 'components/pages/Chat/ChatDesktopSearch';
import Chat from 'components/pages/Chat/Chat';
import Registration from 'components/pages/Login/Registration';
import Modal from 'components/pages/Login/RegistrationModal';
import ModalDelete from 'components/pages/Chat/DeleteModal';
import ModalClear from 'components/pages/Chat/ClearModal';
import Main from 'components/pages/Main/Main';
import ChatMobilDialogs from 'components/pages/Chat/ChatMobilDialogs';
import ChatMobilChat from 'components/pages/Chat/ChatMobilChat';
import ChatMobilChatSearch from 'components/pages/Chat/ChatMobilChatSearch';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    let login = Cookies.getCookie('login')
    let password = Cookies.getCookie('password')
    if (login && password) {
      fetch(process.env.NODE_ENV == 'development' ? "/acceptLogin" : `http://${MAIN_IP}:5000/acceptLogin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ login, password })
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          !data.error && setUserData({ name: data.name, login: data.login, password: data.password })
        });
    }
  }, [])


  return (
    <Htmlcontainer>

      <Routes>
        {
          !userData ? <>
            <Route path="/" element={<Navigate to="/reg" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="main/*" element={<Main userData={userData} onOpenChat={() => { setChatOpened(true) }} />} />
            <Route path="reg" element={<Registration />} />
            <Route path="modald" element={<ModalDelete />} />
            <Route path="modalc" element={<ModalClear />} />
            <Route path="modal" element={<Modal />} />
            <Route path="chatd" element={<ChatDesktop />} />
            <Route path="chatdsh" element={<ChatDesktopSearch />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chatmd" element={<ChatMobilDialogs />} />
            <Route path="chatmch" element={<ChatMobilChat />} />
            <Route path="chatmchsh" element={<ChatMobilChatSearch />} />
          </>
            : <>
              <Route path="*" element={<Navigate to="/main" replace />} />
              <Route path="main/*" element={<Main userData={userData} onOpenChat={() => { setChatOpened(true) }} />} />
            </>
        }
      </Routes>

    </Htmlcontainer>
  );
}

export default App;
