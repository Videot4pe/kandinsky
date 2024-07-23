import React, { MutableRefObject } from "react";

export const useMutationObserver = (
  ref: MutableRefObject<HTMLDivElement | undefined>,
  callback: () => void,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options]);
};