import { ModalWrapper, ModalContainer, ModalText, ModalMiniText, ModalButton, ModalCont, Buttons } from '../../../styles/pages/Chat/DeleteClearModal'
import Icon from '../../../images/Login/ok.png';

const ModalClear = () => {
  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <ModalMiniText>Вы точно хотите очистить диалог?</ModalMiniText>
          <Buttons>
          <ModalButton href="/main/diagnostics">Очистить</ModalButton>
          <ModalButton href="/main/diagnostics">Отмена</ModalButton>
          </Buttons>   
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default ModalClear;
