import IMessage from 'codebase/models/IMessage';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BodySmsBot, BodySmsButton, DateContainer, DeleteTrash, EditPencil } from "styles/pages/Chat/Chat";
interface Props{
    msg: IMessage
}

export const Message = ({ msg } : Props) =>{

    const { store } = useContext(Context)

    const { id } = useParams()

    const deleteMessage = (messageID: number, chatID: number | undefined) =>{
        store.io.emit('deleteMessage', chatID, messageID)
      }

    return(
        store.user.id != msg.author ? 
            <BodySmsBot>
                {msg.text}
                    <DateContainer>
                        {`${new Date(msg.createdAt).getHours()}:${(new Date(msg.createdAt).getMinutes() < 10 ? '0' : '') + new Date(msg.createdAt).getMinutes()}${msg.wasRedacted ? ' ред.' : ''}`}
                    </DateContainer>
            </BodySmsBot> 
            : 
            <BodySmsButton>
                <EditPencil onClick={()=> {store.EditMessageMode(msg.id, msg)}}/>
                <DeleteTrash onClick={()=>{deleteMessage(msg.id,id ? +id.slice(1): undefined)}}/>
                {msg.text}
                <DateContainer>
                    {`${new Date(msg.createdAt).getHours()}:${(new Date(msg.createdAt).getMinutes() < 10 ? '0' : '') + new Date(msg.createdAt).getMinutes()}${msg.wasRedacted ? ' ред.' : ''}`}
                </DateContainer>
            </BodySmsButton>
    )
}
export default observer(Message)