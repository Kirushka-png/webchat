import { ModalWrapper, ModalContainer, SmsInput, ModalMiniText, ModalButton, ModalCont, Buttons } from '../../../styles/pages/Chat/DeleteClearModal'
import Icon from '../../../images/Login/ok.png';

const ModalClear = () => {
  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer style={{height:"30%"}}>
          <ModalMiniText>Введите новое имя:</ModalMiniText>
          <SmsInput placeholder='Введите новое имя'/>
          <Buttons>
          <ModalButton href="/main/diagnostics">Сменить</ModalButton>
          <ModalButton href="/main/diagnostics">Отмена</ModalButton>
          </Buttons>   
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default ModalClear;
