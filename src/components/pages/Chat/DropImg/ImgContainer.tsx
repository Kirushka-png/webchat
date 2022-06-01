import { ReactComponent as DelImg } from "images/Chat/DelImg.svg";
import { ImgShow } from "styles/pages/Chat/DeleteClearModal";

interface Props{
    src: string,
    onDelete(): any,
}
export function ImgContainer({ src, onDelete } : Props) {
    return (
        <ImgShow><img src={src}/><DelImg onClick={()=> onDelete()} style={{marginLeft:"-22px", cursor: 'pointer'}}/></ImgShow>
    );
  }
  
  export default ImgContainer;