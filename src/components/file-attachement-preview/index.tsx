
const imagesTypes = ['png','jpg', 'jpeg', 'gif']

const FileAttachmentPreview = ({url}: {url:string}) => {
    const ext = url.slice(url.lastIndexOf('.') + 1);
    if(imagesTypes.includes(ext)) {
        return <a href={url}><img width={100} height={100} className="thumbnail p-1" src={url} /></a>
    }

    return <a href={url}><img width={100} height={100} className="thumbnail p-1" src='https://placehold.co/100x100?text=File' /></a>

}
 
export default FileAttachmentPreview;