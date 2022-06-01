import { ModalWrapper, ModalContainer, SmsInput, ModalMiniText, ModalButton, ModalCont, Buttons } from 'styles/pages/Chat/DeleteClearModal'

const ChangeNameModal = () => {
  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer style={{height:"30%"}}>
          <ModalMiniText>Введите новое имя:</ModalMiniText>
          <SmsInput placeholder='Введите новое имя'/>
          <Buttons>
          <ModalButton>Сменить</ModalButton>
          <ModalButton>Отмена</ModalButton>
          </Buttons>   
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  )
}

export default ChangeNameModal;
