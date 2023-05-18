import { MouseEvent, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ImageUploading, { ImageListType } from "react-images-uploading";

export interface ImageUpload {
  getImageFile?: (file: File) => File
  previewImage?: string,
  setSelectedImage: (image: File | null) => void,
  handleDeletePreviewImage: () => void
}

const ImageUpload = ({setSelectedImage, previewImage,handleDeletePreviewImage}: ImageUpload) => {

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    if(imageList[0]) {
      if(imageList[0].file) {
        setSelectedImage(imageList[0].file)
      }
    } else {
      setSelectedImage(null);
    }
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <Row>
              <Col>
              <button
                style={isDragging ? { color: "red" } : undefined}
                className="image-drop-button"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                onImageUpload()
                          }}
                {...dragProps}
                >
                  <i className="fa fa-plus"></i>
                  <span>Click Or Drop Image Here</span>
              </button>
              {/* <button onClick={(e: MouseEvent<HTMLButtonElement>) => {
                              e.preventDefault();
                              onImageRemoveAll()
                        }}>
                          Remove all images
              </button> */}
              </Col>
              <Col>
                {
                  (previewImage) && 
                    <div  className="image-item">
                      <img src={previewImage} alt="" height="150" style={{maxWidth:'100%'}}/>
                      <div className="image-item__btn-wrapper">
                        <a href="#" onClick={handleDeletePreviewImage}>
                          <i className="fa fa-close text-danger fa-fw"></i>
                        </a>
                      </div>
                    </div>
                }
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.dataURL} alt="" height="150" />
                    <div className="image-item__btn-wrapper">
                      <a href="#" onClick={() => onImageUpdate(index)}>
                        <i className="fa fa-edit text-dark fa-fw"></i>
                      </a>
                      <a href="#" onClick={() => onImageRemove(index)}>
                        <i className="fa fa-close text-danger fa-fw"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        )}
      </ImageUploading>
  )
}

export default ImageUpload