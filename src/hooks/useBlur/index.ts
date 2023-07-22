import { useEffect, MutableRefObject } from "react";

export function useBlur(ref: MutableRefObject<any>, handleOnBlur: () => void) {

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleOnBlur();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

}