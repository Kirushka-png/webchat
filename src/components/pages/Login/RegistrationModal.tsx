import { ModalWrapper, ModalContainer, ModalText, ModalMiniText, ModalButton, ModalCont } from '../../../styles/pages/Login/LoginModal'
import Icon from '../../../images/Login/ok.png';

const RegistrationModal = () => {
  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <img src={Icon} style={{ "height": "50px", "width": "50px" }} />
          <ModalText style={{ "margin": "0px" }}>Добро пожаловать!</ModalText>
          <ModalMiniText style={{ "margin": "0px" }}>Спасибо, регистрация завершена</ModalMiniText>
          <ModalButton href="/chat">Зайти в чат</ModalButton>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default RegistrationModal;
