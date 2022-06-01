import {ImgShowCont,ImgShow} from "styles/pages/Chat/DeleteClearModal";
import { ReactComponent as DelImg } from "images/Chat/DelImg.svg";
import ImgContainer from "components/pages/Chat/DropImg/ImgContainer"

interface Props{
    onDelete(): any,
}
export function ShowImg({ onDelete } : Props) {
    return (
        <ImgShowCont>
            <ImgContainer src="https://i.ytimg.com/vi/MF6vpY90z0M/maxresdefault.jpg" onDelete={()=>onDelete()}/>
        </ImgShowCont>
    );
  }
  
  export default ShowImg;