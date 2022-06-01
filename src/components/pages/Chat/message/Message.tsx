import { IFile } from 'codebase/models/IFile';
import IMessage from 'codebase/models/IMessage';
import { UPLOADS_URL } from 'codebase/http/index';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BodySmsBot, BodySmsButton, DateContainer, DeleteTrash, EditPencil,ImgContainer,Img } from "styles/pages/Chat/Chat";
interface Props{
    msg: IMessage
}

export const Message = ({ msg } : Props) =>{

    const { store } = useContext(Context)

    const { id } = useParams()

    const deleteMessage = (messageID: number, chatID: number | undefined) =>{
        store.io.emit('deleteMessage', chatID, messageID)
      }

      const [files, setFiles] = useState<IFile[]>([])
      useEffect(() => {
          setFiles([])
        console.log(msg)
          if (msg.file){ 
            const filesid = msg.file.split('/')
            for(const fileid of filesid){
                store.getImageById(+fileid).then((file)=>{file && setFiles(a=>[...a,file]); console.log(file)})
                
            }
          }
        
      }, [])
      
    return(
        store.user.id != msg.author ? 
            <BodySmsBot>
            <ImgContainer><Img src="http://mobimg.b-cdn.net/v3/fetch/fe/fe22186dba2df35f07573604aa8a0e63.jpeg"/></ImgContainer>
                {msg.text}
                    <DateContainer>
                        {`${new Date(msg.createdAt).getHours()}:${(new Date(msg.createdAt).getMinutes() < 10 ? '0' : '') + new Date(msg.createdAt).getMinutes()}${msg.wasRedacted ? ' ред.' : ''}`}
                    </DateContainer>
            </BodySmsBot> 
            : 
            <BodySmsButton>
                <EditPencil onClick={()=> {store.EditMessageMode(msg.id, msg)}}/>
                <DeleteTrash onClick={()=>{deleteMessage(msg.id,id ? +id.slice(1): undefined)}}/>
                <ImgContainer>
                    {files.map((file,idx)=><Img key={idx} src={UPLOADS_URL + '/' + file.name}/>)}
                </ImgContainer>
                {msg.text}
                <DateContainer>
                    {`${new Date(msg.createdAt).getHours()}:${(new Date(msg.createdAt).getMinutes() < 10 ? '0' : '') + new Date(msg.createdAt).getMinutes()}${msg.wasRedacted ? ' ред.' : ''}`}
                </DateContainer>
                
            </BodySmsButton>
    )
}
export default observer(Message)