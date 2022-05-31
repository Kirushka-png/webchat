import Chat from 'components/pages/Chat/Chat';
import ChatDialog from 'components/pages/Chat/ChatDialog';
import Login from 'components/pages/Login/Login';
import Registration from 'components/pages/Login/Registration';
import Main from 'components/pages/Main/Main';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Htmlcontainer from 'styles/App';
import ChangeNameModal from 'components/pages/Chat/ChangeNameModal';
//<Route path="/main/diagnostics">
//<Diagnostics />
// </Route>

export interface IUserData {
  name: string,
  login: string,
  password: string
}
export const MAIN_IP = 'localhost'


const App = () => {
  const data = { name: "123", login: "123", password: "123" }

  const [chatOpened, setChatOpened] = useState(false)
  const [userData, setUserData] = useState<IUserData | null>(null)
  const { store } = useContext(Context)


  return (
    <Htmlcontainer>
      <Routes>
        {
          store.isLoading ? <></> : !store.isAuth ? <>
            <Route path="/" element={<Navigate to="/reg" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="reg" element={<Registration />} />            
          </>
            : <>
              <Route path="*" element={<Navigate to="/chat" replace />} />
              <Route path="/login" element={<Navigate to="/chat" replace />} />
              <Route path="/reg" element={<Navigate to="/chat" replace />} />
              <Route path="main/*" element={<Main userData={userData} onOpenChat={() => { setChatOpened(true) }} />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat/:id" element={<ChatDialog />} />
            </>
        }
      </Routes>

    </Htmlcontainer>
  );
}

export default observer(App);
