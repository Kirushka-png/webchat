import { UPLOADS_URL } from 'codebase/http/index';
import { IFile } from "codebase/models/IFile";
import ImgContainer from "components/pages/Chat/DropImg/ImgContainer";
import { ImgShowCont } from "styles/pages/Chat/DeleteClearModal";

interface Props{
    uploadedFiles: IFile[]
    onDelete({...args}: any): any,
}

export function ShowImg({uploadedFiles, onDelete } : Props) {
    return (
        <ImgShowCont>
            {uploadedFiles.map((file, idx) => <ImgContainer key={ idx } src={UPLOADS_URL + '/' + file.name} onDelete={()=>onDelete(file.id)}/>)}
        </ImgShowCont>
    );
  }
  
  export default ShowImg;