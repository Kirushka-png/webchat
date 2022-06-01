//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IFile } from "codebase/models/IFile";
import { ShowImg } from 'components/pages/Chat/DropImg/ShowImg';
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { ReactComponent as Send } from "images/Chat/Send.svg";
import { Context } from "index";
import _ from "lodash";
import { observer } from 'mobx-react-lite';
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Button, ModalButtons, SmsInput } from "styles/pages/Chat/ChatMobilChat";
interface Props{
    messagesContainer: any
}

export const InputMessageMobil = ({ messagesContainer }: Props) => {

    const isDesktop1 = useMediaQuery({
        query: "(min-width: 600px)"
      });

    const { id } = useParams()
    const { store } = useContext(Context)
    const [messageText, setMessageText] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([])

    const sendMessage = (text: string, chatID: number | undefined, file: string) => {
        if(text.trim() != ''){
          store.io.emit('sendMessage', text, chatID, file)
          messagesContainer.current && (messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight)
          setMessageText('')
        }
      }
    
    const editMessage = (messageID: number, chatID: number | undefined, text: string, file: string) =>{
        if(!_.isEqual(store.msgEdit, store.msg) && (text.trim() != '' || file)){
            store.io.emit('editMessage', messageID, chatID, text, file)
        }
        store.closeEditMode()
    }

    const deleteImg=(id: number)=>{
        let temparr = uploadedFiles
        temparr = _.remove(temparr, (val) => val.id == id)
        setUploadedFiles([...temparr])
    } 

    return (
        <ModalButtons>
            <Images style={{ width: "30px",height:"30px" }}/>
            <Mic style={{ width: "30px",height:"30px" }}/>
            {store.editModeOn ?  
            <>
                <SmsInput placeholder="Введите сообщение" value={store.msgEdit.text} onChange={(e) => { store.setMsgEdit(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.files)} />
                { !isDesktop1 ? 
                <Send style={{ width: "30px",height:"30px" }} onClick={() => { editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.files) }}/> : 
                <Button onClick={() => { editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.files) }}>Изменить</Button>} 
            </>
            :
            <>
                <SmsInput placeholder="Введите сообщение" value={messageText} onChange={(e) => { setMessageText(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && sendMessage(messageText, id ? +id.slice(1) : undefined, '')} />
                { !isDesktop1 ? 
                <Send style={{ width: "30px",height:"30px" }} onClick={() => { sendMessage(messageText, id ? +id.slice(1) : undefined, '') }}/> : 
                <Button onClick={() => { sendMessage(messageText, id ? +id.slice(1) : undefined, '') }}>Отправить</Button>}
            </>
            }
            <ShowImg uploadedFiles={uploadedFiles} onDelete={(id: number)=>{deleteImg(id)}}/>
        </ModalButtons>
    )
}
export default observer(InputMessageMobil)