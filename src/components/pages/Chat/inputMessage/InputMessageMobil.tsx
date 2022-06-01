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
import { Button, SendMessageContainer, SmsInput, UploadInput, UploadLabel } from "styles/pages/Chat/ChatMobilChat";

interface Props {
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
        if(text.trim() != '' || uploadedFiles.length != 0){
          store.io.emit('sendMessage', text, chatID, file)
          messagesContainer.current && (messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight)
          setMessageText('')
          setUploadedFiles([])
        }
      }
    
    const editMessage = (messageID: number, chatID: number | undefined, text: string, file: string) =>{
        if((!_.isEqual(store.msgEdit, store.msg) || !_.isEqual(store.filesEdit, store.files)) && (text.trim() != '' || store.files.length != 0)){
            store.io.emit('editMessage', messageID, chatID, text, file)
        }
        store.closeEditMode()
    }

    const deleteImgFromStore=(id: number)=>{
        let temparr = store.files
        temparr = _.filter(temparr, (val) => val.id != id)
        store.setFiles([...temparr])
    }
    const deleteImg=(id: number)=>{
        let temparr = uploadedFiles
        temparr = _.filter(temparr, (val) => val.id != id)
        setUploadedFiles([...temparr])
    } 
    const UploadNewFile = (files: FileList | null) => {
        if(files && files.length != 0){
            store.UploadFile(files[0]).then((file) =>{
                store.editModeOn ? store.setFiles([...store.files, file]) : setUploadedFiles(a => [...a, file])
            })
        }
    }

    return (
        <SendMessageContainer>
            <UploadLabel htmlFor="upload"><Images /></UploadLabel>
            <UploadInput type="file" id="upload" onChange={(e) => UploadNewFile(e.target.files)} accept="image/*"/>
            <Mic style={{ width: "30px", height: "30px" }} />
            {store.editModeOn ?
                <>
                    <SmsInput placeholder="Введите сообщение" value={store.msgEdit.text} onChange={(e) => { store.setMsgEdit(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined, store.msgEdit.text, (store.files.map((file)=> file.name.toString())).join('/'))} />
                    {!isDesktop1 ?
                        <Send style={{ width: "30px", height: "30px" }} onClick={() => { editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined, store.msgEdit.text, (store.files.map((file)=> file.name.toString())).join('/')) }} /> :
                        <Button onClick={() => { editMessage(store.msgEdit.id, id ? +id.slice(1) : undefined, store.msgEdit.text, store.msgEdit.file) }}>Изменить</Button>}
                </>
                :
                <>
                    <SmsInput placeholder="Введите сообщение" value={messageText} onChange={(e) => { setMessageText(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' && sendMessage(messageText, id ? +id.slice(1) : undefined, (uploadedFiles.map((file)=> file.name.toString())).join('/'))} />
                    {!isDesktop1 ?
                        <Send style={{ width: "30px", height: "30px" }} onClick={() => { sendMessage(messageText, id ? +id.slice(1) : undefined, (uploadedFiles.map((file)=> file.name.toString())).join('/')) }} /> :
                        <Button onClick={() => { sendMessage(messageText, id ? +id.slice(1) : undefined, '') }}>Отправить</Button>}
                </>
            }
            {
                store.editModeOn ? <ShowImg uploadedFiles={store.files} onDelete={(id: number) => deleteImgFromStore(id)} /> :
                    <ShowImg uploadedFiles={uploadedFiles} onDelete={(id: number) => deleteImg(id)} />
            }
        </SendMessageContainer>
    )
}
export default observer(InputMessageMobil)