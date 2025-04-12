"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onAdd?: () => void;
};

const TextToolbar: React.FC<Props> = ({
  //We use it to position the toolbar near the target element 
  targetRef,
  onDelete,
  onDuplicate,
  onMoveUp,
  onAdd,
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ⏳ Debounce helper
    const debounce = (func: Function, wait: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), wait);
        };
    };
  

  const updatePosition = useCallback(() => {
    const target = targetRef.current;
    const toolbar = toolbarRef.current;
    // console.log("targetRef:", target);
    // console.log("toolbarRef:",toolbarRef);
    // This ensures both elements exist in the DOM before trying to measure and use them.
    if (target && toolbar) {
      const rect = target.getBoundingClientRect();
    //   const toolbarWidth = toolbar.offsetWidth;

      const toolbarHeight = toolbar.offsetHeight;
      setPosition({
        top: rect.top + window.scrollY - toolbarHeight+8, // adjust this value to get the spacing you want
        left: rect.left + window.scrollX ,
        });
    }
  }, []);

  useLayoutEffect(() => {
    updatePosition();

    const handleResizeOrScroll = () => updatePosition();
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);

    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [updatePosition]);

  const debouncedUpdatePosition = useCallback(debounce(updatePosition, 100), [updatePosition]);

  useEffect(() => {
    const observer = new MutationObserver(debouncedUpdatePosition);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  
    return () => observer.disconnect();
  }, [debouncedUpdatePosition]);

  return (
    <div
      ref={toolbarRef}
      className=" fixed z-50 bg-blue-500 text-white"
      style={{
        top: position.top,
        left: position.left,
        transition: "top 0.08s ease",
      }}
    >
      <span className="font-bold">Text</span>
      <button onClick={onAdd} title="Add">➕</button>
      <button onClick={onMoveUp} title="Move Up">⬆️</button>
      <button onClick={onDelete} title="Delete">🗑</button>
      <button onClick={onDuplicate} title="Duplicate">📄</button>
    </div>
  );
};

export default TextToolbar;
