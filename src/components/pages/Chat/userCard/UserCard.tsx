import { DialogItemCheck, ModalText } from "styles/pages/Chat/Chat";
import { ReactComponent as Veronika } from "images/Chat/Veronika.svg";
import { IUser } from "codebase/models/IUser";

interface Props {
    user: IUser
}
const UserCard = ({ user }: Props) => {
    return (<DialogItemCheck>
        <Veronika style={{ width: "50px" }} />
        <ModalText>{user.name}</ModalText>
    </DialogItemCheck>
    );
};

export default UserCard;
