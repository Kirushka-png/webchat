import { ModalWrapper, ModalContainer, ModalText, ModalMiniText, ModalButton, ModalCont,Buttons  } from '../../../styles/pages/Chat/DeleteClearModal'
import Icon from '../../../images/Login/ok.png';

const ModalDelete = () => {
  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <ModalMiniText>Вы точно хотите удалить чат?</ModalMiniText>
          <Buttons>
          <ModalButton href="/main/diagnostics">Удалить</ModalButton>
          <ModalButton href="/main/diagnostics">Отмена</ModalButton>
          </Buttons>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default ModalDelete;
