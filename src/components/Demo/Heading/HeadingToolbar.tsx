"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { ArrowUp } from "@/components/Icons/ArrowUp";
import { Move}from "@/components/Icons/move";
import { Delete } from "@/components/Icons/Delete";
import { DuplicateIcon } from "@/components/Icons/DuplicateIcon";

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onAdd?: () => void;
};

const HeadingToolbar: React.FC<Props> = ({
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
    
    if (target && toolbar) {
      const rect = target.getBoundingClientRect();
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
      className=" fixed z-50 bg-blue-500 Heading-white px-1 flex gap-1 text-white"
      style={{
        top: position.top,
        left: position.left,
        transition: "top 0.08s ease",
      }}
    >
      <span className="Heading-sm ">Heading</span>
      <button onClick={onAdd} title="Add"><Move height={12} width={12} fill="white"/> </button>
      <button onClick={onMoveUp} title="Move Up"><ArrowUp height={12} width={12} fill="white"/></button>
      <button onClick={onDelete} title="Delete"><Delete height={12} width={12} fill="white" /></button>
      <button onClick={onDuplicate} title="Duplicate"><DuplicateIcon height={10} width={10} fill="white"/></button>
    </div>
  );
};

export default HeadingToolbar;
