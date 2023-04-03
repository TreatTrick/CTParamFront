// JsonFileUploader.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';

interface Props {
  onJsonUpload: (data: any) => void;
}

const JsonFileUploader: React.FC<Props> = ({ onJsonUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = JSON.parse(reader.result as string);
        onJsonUpload(result);
      };

      reader.readAsText(file);
    });
  }, [onJsonUpload]);

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true, accept: {'application': ['json']}});

  return (
    <div {...getRootProps()} style={{ border: '2px dashed gray', padding: 20, textAlign: 'center', height:'50vh'}}>
      <input {...getInputProps()} />
      <p>请将文件拖放到此处或点击按钮选择</p>
      <Button variant="contained" color="primary" onClick={open}>
        选择文件
      </Button>
    </div>
  );
};

export default JsonFileUploader;
