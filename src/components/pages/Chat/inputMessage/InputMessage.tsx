//import { ReactComponent as CloseModal } from "images/CloseModal.svg";
import { IFile } from "codebase/models/IFile";
import { DropImg } from 'components/pages/Chat/DropImg/DropImg';
import { ShowImg } from 'components/pages/Chat/DropImg/ShowImg';
import { ReactComponent as Images } from "images/Chat/Images.svg";
import { ReactComponent as Mic } from "images/Chat/Mic.svg";
import { Context } from "index";
import _ from "lodash";
import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { Button, ModalButtons, SmsInput, UploadInput, UploadLabel } from "styles/pages/Chat/Chat";

interface Props{
    messagesContainer: any
}

export const InputMessage = ({ messagesContainer }: Props) => {

    const { id } = useParams()
    const { store } = useContext(Context)
    const [messageText, setMessageText] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([])

    const sendMessage = (text: string, chatID: number | undefined, file: string) => {
        if(text.trim() != '' || uploadedFiles.length != 0){
          store.io.emit('sendMessage', text, chatID, file)
          messagesContainer.current && (messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight)
          setMessageText('')
          setUploadedFiles([])
        }
      }
    
    const editMessage = (messageID: number, chatID: number | undefined, text: string, file: string) =>{
        if(!_.isEqual(store.msgEdit, store.msg) && (text.trim() != '' || uploadedFiles.length != 0)){
            store.io.emit('editMessage', messageID, chatID, text, file)
        }
        store.closeEditMode()
    }

    const UploadNewFile = (files: FileList | null) => {
        if(files && files.length != 0){
            store.UploadFile(files[0]).then((file) =>{
                setUploadedFiles(a => [...a, file])
            })
        }
    }
    const deleteImg=(id: number)=>{
        let temparr = uploadedFiles
        temparr = _.filter(temparr, (val) => val.id != id)
        setUploadedFiles([...temparr])
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
            <UploadLabel htmlFor="upload"><Images /></UploadLabel>
            <UploadInput type="file" id="upload" onChange={(e) => UploadNewFile(e.target.files)}/>
            <Mic />
            {store.editModeOn ?  
            <>
                <SmsInput placeholder="Введите сообщение" value={store.msgEdit.text} onChange={(e) => { store.setMsgEdit(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.file)} />
                <Button onClick={() => { editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined,store.msgEdit.text, store.msgEdit.file) }}>Изменить</Button>
            </>
            :
            <>
                <SmsInput placeholder="Введите сообщение" value={messageText} onChange={(e) => { setMessageText(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && sendMessage(messageText, id ? +id.slice(1) : undefined, (uploadedFiles.map((file)=> file.id.toString())).join('/'))} />
                <Button onClick={() => { sendMessage(messageText, id ? +id.slice(1) : undefined, (uploadedFiles.map((file)=> file.id.toString())).join('/')) }}>Отправить</Button>
            </>
            }
            {isDragActive&& <DropImg/>}       
        <ShowImg uploadedFiles={uploadedFiles} onDelete={(id: number)=> deleteImg(id)}/>
        </ModalButtons> 
        </>
        )
}
export default observer(InputMessage)