import {ImgShowCont,ImgShow} from "styles/pages/Chat/DeleteClearModal";
import { ReactComponent as DelImg } from "images/Chat/DelImg.svg";

interface Props{
    src: string,
    onDelete(): any,
}
export function ImgContainer({ src } : Props, { onDelete } : Props) {
    return (
        <ImgShow><img src={src}/><DelImg onClick={()=> onDelete()} style={{marginLeft:"-22px"}}/></ImgShow>
    );
  }
  
  export default ImgContainer;