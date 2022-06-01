//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { Context } from "index";
import _ from "lodash";
import { observer } from 'mobx-react-lite';
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, ModalButtons, SmsInput } from "styles/pages/Chat/Chat";
import { DropImg } from 'components/pages/Chat/DropImg/DropImg';
import { ShowImg } from 'components/pages/Chat/DropImg/ShowImg';
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";

interface Props{
    messagesContainer: any
}

export const InputMessage = ({ messagesContainer }: Props) => {

    const { id } = useParams()
    const { store } = useContext(Context)
    const [messageText, setMessageText] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState()

    const sendMessage = (text: string, chatID: number | undefined, file: FileReader | undefined) => {
        if(text.trim() != ''){
          store.io.emit('sendMessage', text, chatID, file)
          messagesContainer.current && (messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight)
          setMessageText('')
        }
      }
    
    const editMessage = (messageID: number, chatID: number | undefined, text: string, file: string[] | undefined) =>{
        if(!_.isEqual(store.msgEdit, store.msg) && (text.trim() != '' || file)){
            store.io.emit('editMessage', messageID, chatID, text, file)
        }
        store.closeEditMode()
    }

    const deleteImg=()=>{

    } 

    const [files, setFiles] = useState<File>();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles[0]);
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
        multiple: false,
        accept: { "image/*": [".jpeg", ".png", ".jpg", ".gif"] },
        onDrop,
        noClick:true,
      });
    return (
        <>
        <ModalButtons {...getRootProps()}>
            <Images style={{cursor:"pointer"}}/>
            <Mic />
            {store.editModeOn ?  
            <>
                <SmsInput placeholder="Введите сообщение" value={store.msgEdit.text} onChange={(e) => { store.setMsgEdit(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.files)} />
                <Button onClick={() => { editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.files) }}>Изменить</Button>
            </>
            :
            <>
                <SmsInput placeholder="Введите сообщение" value={messageText} onChange={(e) => { setMessageText(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && sendMessage(messageText, id ? +id.slice(1) : undefined, uploadedFiles)} />
                <Button onClick={() => { sendMessage(messageText, id ? +id.slice(1) : undefined, uploadedFiles) }}>Отправить</Button>
            </>
            }
            {isDragActive&& <DropImg/>}       
        <ShowImg onDelete={()=> deleteImg()}/>
        </ModalButtons> 
        </>
        )
}
export default observer(InputMessage)