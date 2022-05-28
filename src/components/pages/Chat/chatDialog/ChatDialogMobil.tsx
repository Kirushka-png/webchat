import UserImg from "images/Chat/UserImg.png";
import {
    DialogItem, ModalText
} from "styles/pages/Chat/ChatMobilDialogs";

interface Props{
    name: string
}

export const ChatDialogMobil = ({name}: Props) => {

    return (
        <DialogItem>
            <img
                src={UserImg}
                style={{ height: "50px", width: "50px" }}
            />
            <ModalText>{name}</ModalText>
        </DialogItem>
    )
}
export default ChatDialogMobil