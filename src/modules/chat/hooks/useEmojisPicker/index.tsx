import { useRef, useState } from "react";
import EmojisPicker from "../../components/emoji-picker";
import { useBlur } from "../../../../hooks/useBlur";
import { EmojiClickData } from "emoji-picker-react";

const useEmojisPicker = (config?: {handleEmojiClick?: (emoji: EmojiClickData) => void}) => {

    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const emojisPickerRef = useRef<HTMLDivElement>(null);  

    const closeEmojiPicker = () => setIsPickerOpen(false);
    const openEmojiPicker = () => setIsPickerOpen(true);
 
    useBlur(emojisPickerRef, closeEmojiPicker);

    const renderEmojisPicker = () => isPickerOpen ? <EmojisPicker ref={emojisPickerRef} handleEmojiClick={config?.handleEmojiClick} /> : null
    
    return { isPickerOpen, renderEmojisPicker, openEmojiPicker, closeEmojiPicker }
    
}
 
export default useEmojisPicker;