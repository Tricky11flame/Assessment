import { BaseComponent } from "../../BaseComponents/BaseModal";
import React from "react";
import ContentEditable from "react-contenteditable";
import { useNode, useEditor } from "@craftjs/core";
import { TextSettings } from "./TextSettings";
import { useEffect , useState , useRef } from "react";
import TextToolbar from "./TextToolbar";

type TextProps = {
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
  trigger?:string;
};

export const Text = ({ className, trigger = "click" ,content, ...props }: TextProps) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [show, setShow] = useState(false);
const wrapperRef = useRef<HTMLDivElement>(null);

const handleMouseOver = () => {
  if (trigger === "hover") {
    setShow(true);
  };
};

const handleMouseLeft = () => {
  if (trigger === "hover") {
    setShow(false);
  };
};

useEffect(() => {
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    }
  }

  if (show) {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }
}, [show, wrapperRef]);


  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeft}
      className="w-fit h-fit relative flex justify-center"
      >
      <div
        onClick={() => setShow(!show)}
      >
        <>
        <BaseComponent
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
        innerRef={connect}
        html={content} // innerHTML of the editable div
        disabled={!enabled}
        onChange={(e) => {
          setProp((prop: any) => (prop.content = e.target.value), 500);
        }} // use true to disable editing
        tagName="p" // Use a custom HTML tag (uses a div by default)
        />
        </BaseComponent>
        </>
      </div>
      <div
        hidden={!show}
        className="min-w-fit w-[200px] h-fit absolute bottom-[100%] z-50 ">
          <div className="">
            <TextToolbar
            targetRef={wrapperRef }
            // onDelete={handlers.onDelete}
            // onDuplicate={handlers.onDuplicate}
            // onMoveUp={handlers.onMoveUp}
            // onAdd={handlers.onAdd}
          />

          </div>
      </div>
    </div>
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    text: "Hello World",
    margin: ["5", "0", "5", "0"],
    padding: ["5", "0", "5", "0"],
    content: "Text",
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
    toolbar: TextSettings,
  },
};