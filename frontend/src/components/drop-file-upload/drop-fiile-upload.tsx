import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export interface FileUploaderProps {
  setFile: (file: File) => void;
}

export function DropFileUpload(props: FileUploaderProps) {

  return (
    <>
      <Dropzone
        onDrop={(files) => props.setFile(files[0])}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      >
        {() => <div style={{ pointerEvents: "none" }}>Drop files here</div>}
      </Dropzone>
    </>
  );
}
