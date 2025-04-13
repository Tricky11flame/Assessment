// Demo/Heading.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import { BaseComponent } from "@/components/BaseComponents/BaseModal";
import { HeadingSettings } from "./HeadingSettings";
import HeadingToolbar from "./HeadingToolbar";

type HeadingProps = {
  content: string;
  className?: string;
  color?: Record<"r" | "g" | "b" | "a", number>;
  background?: Record<"r" | "g" | "b" | "a", number>;
  buttonStyle?: string;
  margin?: any[];
  padding?: any[];
  display?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  position?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  spacing?: string;
  align?: string;
  verticalAlign?: string;
  transform?: string;
  decoration?: string;
  opacity?: number;
  cursor?: string;
  trigger?: "click" | "hover";
};

export const Heading = ({
  content,
  trigger = "click",
  className,
  ...props
}: HeadingProps) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Show settings when hovering or clicking, based on the trigger type
  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setShow(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [show]);

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className="w-fit h-fit relative flex justify-center"
    >
      <div onClick={() => setShow(!show)}>
        <BaseComponent
          ref={connect}
          className={className}
          $buttonStyle={props.buttonStyle}
          $background={props.background}
          $color={props.color}
          $margin={props.margin}
          $padding={props.padding}
          $display={props.display}
          $width={props.width}
          $minWidth={props.minWidth}
          $maxWidth={props.maxWidth}
          $height={props.height}
          $minHeight={props.minHeight}
          $maxHeight={props.maxHeight}
          $position={props.position}
          $borderRadius={props.borderRadius}
          $borderWidth={props.borderWidth}
          $borderStyle={props.borderStyle}
          $borderColor={props.borderColor}
          $fontSize={props.fontSize}
          $fontWeight={props.fontWeight}
          $lineHeight={props.lineHeight}
          $spacing={props.spacing}
          $align={props.align}
          $verticalAlign={props.verticalAlign}
          $transform={props.transform}
          $decoration={props.decoration}
          $opacity={props.opacity}
          $cursor={props.cursor}
        >
          <ContentEditable
            html={content}
            innerRef={connect}
            disabled={!enabled}
            onChange={(e) => setProp((props: any) => (props.content = e.target.value), 500)}
            tagName="h1"
          />
        </BaseComponent>
      </div>

      {/* Show settings when the user hovers or clicks */}
      <div hidden={!show} className="min-w-fit w-[200px] h-fit absolute bottom-[100%] z-50">
        <HeadingToolbar targetRef={wrapperRef} />
      </div>
    </div>
  );
};

Heading.craft = {
  displayName: "Heading",
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    content: "Hello World",
    margin: ["5", "0", "5", "0"],
    padding: ["5", "0", "5", "0"],
    display: "inline-block",
    width: "auto",
    minWidth: "0",
    maxWidth: "100%",
    height: "auto",
    minHeight: "0",
    maxHeight: "none",
    position: "relative",
    borderRadius: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    fontSize: "16px",
    fontWeight: "normal",
    lineHeight: "1.5",
    spacing: "0",
    align: "center",
    verticalAlign: "middle",
    transform: "none",
    decoration: "none",
    opacity: 1,
    cursor: "pointer",
  },
  related: {
    toolbar: HeadingSettings,
  },
};
