import {useEffect, useState} from 'react';
import { Stack } from 'react-bootstrap';

import {DropEvent, FileRejection, useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const dropZoneStyle = {
  padding: '20px',
  textAlign: "center",
  cursor: 'pointer',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  backgroundColor: '#152335'
}

interface PreviewProps {
    files: File[];
    handleDrop?: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void)
}

function Previews({files, handleDrop}: PreviewProps) {

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      '*/*': []
    },
    onDrop: handleDrop
  });
  
  const thumbs = files.map(file => {
    if(/image\/*/.test(file.type)) {
      return <Stack direction='vertical'>
                <div style={thumb} key={file.name}>
                  <div style={thumbInner}>
                    <img
                      src={file.preview}
                      style={img}
                      // Revoke data uri after image is loaded
                      onLoad={() => { URL.revokeObjectURL(file.preview) }}
                    />
                  </div>
                </div>
                <div style={{maxWidth: 'min-content'}}>{file.name}</div>
             </Stack>
    }
    return <Stack direction='vertical'>
              <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                  <img
                    src='https://placehold.co/100x100?text=File'
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                  />
                </div>
              </div>
              <div style={{maxWidth: 'min-content'}}>{file.name}</div>
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
          Drag 'n' drop some files here, or click to select files
        </span>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}

const useFilesUpload = (config ?: {onUpload?: (files: File[]) => void}) => {

    const [files, setFiles] = useState<File[]>([]);
    const handleDrop = acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        config?.onUpload?.(acceptedFiles);
    }
    
    const renderPreview = () => <Previews files={files} handleDrop={handleDrop} />

    return { files, renderPreview }

}
 
export default useFilesUpload;