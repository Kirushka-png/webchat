import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import {
    DialogItem, ModalText
} from "styles/pages/Chat/ChatMobilDialogs";

interface Props{
    name: string
}

export const ChatDialog = ({name}: Props) => {

    return (
        <DialogItem>
            <Veronika style={{ width: "50px" }} />
            <ModalText>{name}</ModalText>
        </DialogItem>
    )
}
export default ChatDialog