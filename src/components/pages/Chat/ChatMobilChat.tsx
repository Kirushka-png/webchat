//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as LineVert } from "images/Chat/LineVert.svg";
import { ReactComponent as Online } from "images/Chat/Online.svg";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as Menu } from "images/Chat/Justify.svg";
import { ReactComponent as Send } from "images/Chat/Send.svg";
import { ReactComponent as Settings } from "images/Chat/Gear.svg";
import UserIcon from "images/Chat/UserImg.png";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { useMediaQuery } from "react-responsive";
import {
  BodySmsBot,
  BodySmsButton,
  Button,
  Chat,
  ModalBody,
  ModalButtons,
  ModalCont,
  ModalContainer,
  ModalHeader,
  ModalName,
  ModalText,
  ModalWrapper,
  ModalMenu,
  SmsInput,

} from "../../../styles/pages/Chat/ChatMobilChat";



const RegistrationModal = () => {

    const isDesktop = useMediaQuery({
        query: "(min-width: 1000px)"
      });

      const isDesktop1 = useMediaQuery({
        query: "(min-width: 600px)"
      });

  return (
      
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
        <Chat>
            <ModalHeader>
              <ModalMenu>
                <Menu style={{ width: "30px",height:"30px" }} />
              </ModalMenu>
              <Veronika style={{ width: "40px",height:"40px" }} />
              <ModalName>
                <ModalText>Вероника</ModalText>
                <Online style={{ marginLeft: "-10px" }} />
              </ModalName>
            </ModalHeader>
            <LineHor style={{ width: "90%" }} />
            <ModalBody id="chatContainer">
              <BodySmsBot>Привет, как дела?</BodySmsBot>
              <BodySmsButton>Привет, все отлично, как ты?</BodySmsButton>
            </ModalBody>
            <LineHor style={{ width: "90%" }} />
            <ModalButtons>
              <Images style={{ width: "30px",height:"30px" }}/> 
              <Mic style={{ width: "30px",height:"30px" }}/>
              <SmsInput placeholder="Введите сообщение" />
              { !isDesktop1 ? <Send style={{ width: "30px",height:"30px" }}/> : <Button>Отправить</Button>}
            </ModalButtons>
          </Chat>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  );
};

export default RegistrationModal;
