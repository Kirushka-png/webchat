import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Buttons, ModalButton, ModalCont, ModalContainer, ModalMiniText, ModalWrapper, SmsInput } from 'styles/pages/Chat/DeleteClearModal';

const ChangeNameModal = () => {

  const { store } = useContext(Context)
  const [username, setUsername] = useState<string>(store.user.name)

  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer style={{height:"30%"}}>
          <ModalMiniText>Введите новое имя:</ModalMiniText>
          <SmsInput placeholder='Введите новое имя' onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
          <Buttons>
          <ModalButton onClick={()=>{username.trim() != '' && store.changeUsername(username); store.setChangeNameModal(false)}}>Сменить</ModalButton>
          <ModalButton onClick={()=> {store.setChangeNameModal(false)}}>Отмена</ModalButton>
          </Buttons>   
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default observer(ChangeNameModal);
