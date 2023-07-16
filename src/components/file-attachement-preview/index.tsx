
const imagesTypes = ['png','jpg', 'jpeg', 'gif']

const FileAttachmentPreview = ({url}: {url:string}) => {
    console.log(url)
    const ext = url.slice(url.lastIndexOf('.') + 1);
    console.log(ext)
    if(imagesTypes.includes(ext)) {
        console.log('True')
        return <img src={url} />
    }

    return <div>{url}</div>

}
 
export default FileAttachmentPreview;