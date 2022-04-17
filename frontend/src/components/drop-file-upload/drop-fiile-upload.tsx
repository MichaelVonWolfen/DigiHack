import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {useState} from "react";

export interface FileUploaderProps {
  setFile: (file: File) => void;
}

export function DropFileUpload(props: FileUploaderProps) {
    const[fileName, setFileName] = useState("Drop file here")
  return (
    <>
      <Dropzone style={{width:"max(200px, 40vw)", textAlign:"center", minWidth:"100px"}}
        onDrop={(files) => {
            props.setFile(files[0])
            let fileName = files[0].name
            if(fileName.length > 50)
                fileName = fileName.substring(0,50) + "..."
            setFileName(fileName)
        }}
        onReject={(files) => console.log("rejected file", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      >
        {() => <div style={{ pointerEvents: "none" }}>{fileName}</div>}
      </Dropzone>
    </>
  );
}
