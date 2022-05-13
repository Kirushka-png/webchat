import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  ModalWrapper,
  ModalContainerDrop,
  DropContainer,
  ModalMiniText,
  ModalButton,
  ModalButtonInput,
  ModalCont,
  Buttons,
  DropContainerImage,
} from "../../../styles/pages/Chat/DeleteClearModal";

export function MyDropzone() {
  const [files, setFiles] = useState<File>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".gif"] },
    onDrop,
  });

  return (
    <ModalWrapper>
      <ModalCont>
        <ModalContainerDrop>
          <ModalMiniText>
            Вы можете загрузить изображение в формате JPG или PNG
          </ModalMiniText>
          <Buttons>
            <ModalButtonInput>Выбрать<input {...getInputProps()} /></ModalButtonInput>        
          </Buttons>
          <DropContainer {...getRootProps()}>
            <DropContainerImage
              imgback={files ? URL.createObjectURL(files) : undefined}
            >
              <input {...getInputProps()} />
              {!files &&
                (isDragActive ? (
                  <p>Отпустите изображение</p>
                ) : (
                  <p>Перетащите изображение</p>
                ))}
            </DropContainerImage>
          </DropContainer>
        </ModalContainerDrop>
      </ModalCont>
    </ModalWrapper>
  );
}
