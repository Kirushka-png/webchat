import { ModalWrapper, ModalContainer, ModalText, ModalMiniText, ModalButton, ModalCont } from '../../../styles/pages/Login/LoginModal'
import Icon from '../../../images/Login/ok.png';

const RegistrationModal = () => {
  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <img src={Icon} style={{ "height": "50px", "width": "50px" }} />
          <ModalText>Добро пожаловать!</ModalText>
          <ModalMiniText>Спасибо, регистрация завершена</ModalMiniText>
          <ModalButton href="/main/diagnostics">Перейти к диагностике</ModalButton>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default RegistrationModal;
