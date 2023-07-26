import { useContext, forwardRef, ForwardedRef } from "react";

import EmojiPicker, { EmojiClickData, SuggestionMode, Theme, Props } from "emoji-picker-react";
import styled from "styled-components";

import { LayoutContext } from "../../../../contexts/layout-context";

const StyledEmojisPicker = styled.div`
    & .EmojiPickerReact.epr-dark-theme {
        background-color: #152335;
    }
    & .EmojiPickerReact.epr-dark-theme .epr-emoji-category-label {
        background-color:#0b1727;
    }
    & .EmojiPickerReact.epr-dark-theme .epr-search-container input.epr-search {
        background-color: #121e2d;
        border: none
    }
`

const EmojisPicker = forwardRef(function(
    props: {
        handleEmojiClick?: (emoji: EmojiClickData) => void,
    } & Props,
    ref: ForwardedRef<HTMLDivElement>) {

    const theme = useContext(LayoutContext);

    return  <StyledEmojisPicker>
                <div className="emoji-picker-holder position-absolute" ref={ref}>
                    <EmojiPicker 
                        lazyLoadEmojis
                        suggestedEmojisMode={SuggestionMode.FREQUENT}
                        theme={
                            theme.theme === 'DARK' ? Theme.DARK : Theme.LIGHT
                        } 
                        onEmojiClick={props?.handleEmojiClick}
                        {...props} />
                </div>;
            </StyledEmojisPicker>
            
})
 
export default EmojisPicker;