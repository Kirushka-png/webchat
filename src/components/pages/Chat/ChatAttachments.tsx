import { ReactComponent as LineHor } from "images/Chat/LineHor.svg";
import { ReactComponent as Close } from "images/Chat/XCircle.svg";
import { useMediaQuery } from "react-responsive";
import {
  Chat,
  ModalBody,
  ModalCont,
  ModalContainer,
  ModalHeader,
  ModalName,
  ModalText,
  ModalWrapper,
  ModalSettings,
  Images,
  ImagesCont,
} from "../../../styles/pages/Chat/ChatMobilChat";

const ChatAttachments = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1000px)",
  });

  const isDesktop1 = useMediaQuery({
    query: "(min-width: 600px)",
  });

  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainer>
          <Chat>
            <ModalHeader>
              <ModalName
                style={{ width: "90%", marginRight: "0", marginLeft: "10%" }}
              >
                <ModalText style={{ margin: "0px"}}>Вложения</ModalText>
              </ModalName>
              <ModalSettings style={{ width: "10%", marginLeft: "0" }}>
                <Close style={{ width: "30px" }}/>
              </ModalSettings>
            </ModalHeader>
            <LineHor style={{ width: "90%" }} />
            <ImagesCont>
              <Images />
              <Images />
              <Images />
              <Images />
              <Images />
            </ImagesCont>
          </Chat>
        </ModalContainer>
      </ModalCont>
    </ModalWrapper>
  );
};

export default ChatAttachments;
