import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropContainerImg, DropContainerImage } from "styles/pages/Chat/DeleteClearModal";
import InputMessage from 'components/pages/Chat/inputMessage/InputMessage';

export function DropImg() {
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
          <DropContainerImg {...getRootProps()}>
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
          </DropContainerImg>
  );
}
