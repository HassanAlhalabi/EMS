import { CSSProperties, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';

import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import useTranslate from '../useTranslate';

interface AcceptedFile extends File {
  preview: string
}

const thumbsContainer: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative'
};

const deleteFileStyle: CSSProperties = {
  position: 'absolute',
  top: '3px',
  right: '5px',
  padding: '1px',
  // backgroundColor: '#FFF',
  cursor: 'pointer'
}

const thumbInner: CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const dropZoneStyle: CSSProperties = {
  padding: '20px',
  textAlign: "center",
  cursor: 'pointer',
  fontWeight: 'bold',
  textTransform: 'uppercase',
}

const titleStyle: CSSProperties = {
  maxWidth: '100px',
  padding: '3px 5px',
  fontSize: '12px'
}

interface PreviewProps {
    files: AcceptedFile[];
    multiple?: boolean;
    handleDrop?: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void),
    handleRemoveFile?: (fileName: string) => void   
}

function Previews({files, handleDrop, handleRemoveFile, multiple}: PreviewProps) {

  const t = useTranslate();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      '*/*': []
    },
    multiple: multiple ? multiple : false,
    onDrop: handleDrop
  });

  const thumbs = files.map((file,key)=> {
    // In Case Image File
    if(/image\/*/.test(file.type)) {
      return <Stack key={`${file.name}${key}`} direction='vertical'>
                <div style={thumb} key={file.name}>
                  <span style={deleteFileStyle} onClick={() => handleRemoveFile?.(file.name)}>
                    <i className='fa fa-trash text-danger'></i>
                  </span>
                  <div style={thumbInner}>
                    <img
                      src={file.preview}
                      style={img}
                    />
                  </div>
                </div>
                <div style={titleStyle}>{file.name}</div>
              </Stack>
    }
    return <Stack key={`${file.name}${key}`} direction='vertical'>
              <div style={thumb} key={file.name}>
                <span style={deleteFileStyle} onClick={() => handleRemoveFile?.(file.name)}>
                  <i className='fa fa-trash text-danger'></i>
                </span>
                <div style={thumbInner}>
                  <img
                    src='https://placehold.co/100x100?text=File'
                    style={img}
                  />
                </div>
              </div>
              <div style={titleStyle}>{file.name}</div>
            </Stack>
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div>
      <div {...getRootProps({className: 'dropzone'})} style={dropZoneStyle}>
        <input {...getInputProps()} />
        <i className='d-block fa fa-plus fa-2x mb-2'></i>
        <span>
          {t('click_or_drop_files_here')}
        </span>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}

const useFilesUpload = (config ?: {
                                    multiple?: boolean,
                                    onUpload?: (files: AcceptedFile[]) => void
                                    onFileRemove?: (fileName?: string) => void
                                  }) => {

    const [files, setFiles] = useState<AcceptedFile[]>([]);
    const handleDrop = (acceptedFiles: File[]) => {
      const filteredAcceptedFiles: File[] = [];
      acceptedFiles.map(acceptedFile => {
        if(files.findIndex(file => file.name === acceptedFile.name) === -1) {
          filteredAcceptedFiles.push(acceptedFile);
        } 
      })
      if(!config?.multiple) {
          setFiles([...filteredAcceptedFiles.map((file) => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))]);
      }
      if(config?.multiple) {
        setFiles(prev => [...prev, ...filteredAcceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))] );
      }
      config?.onUpload?.(filteredAcceptedFiles as AcceptedFile[]);
    }

    const handleRemoveFile = (fileName: string) => { 
      setFiles(prev => prev.filter(file => file.name !== fileName));
      config?.onFileRemove?.(fileName);
    }
    
    const renderPreview = () => <Previews multiple={config?.multiple} 
                                          files={files} 
                                          handleDrop={handleDrop} 
                                          handleRemoveFile={handleRemoveFile} />

    return { files, renderPreview }

}
 
export default useFilesUpload;