// Demo/Table/Table.tsx
import React from "react";
import { useNode } from "@craftjs/core";
import { BaseComponent } from "@/components/BaseComponents/BaseModal";
import { HeadingSettings } from "./HeadingSettings";

export type HeadingProps = {
  children?: React.ReactNode;
  className?: string;
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
};

export const Heading = ({ children, ...props }: HeadingProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <BaseComponent
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      $background={props.background}
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
      {children}
    </BaseComponent>
  );
};

Heading.craft = {
  displayName: "Heading",
  props: {
    background: { r: 255, g: 255, b: 255, a: 0.5 },
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: ["0", "0", "0", "0"],
    padding: ["20", "20", "20", "20"],
    width: "100%",
    minWidth: "0",
    maxWidth: "100%",
    height: "auto",
    minHeight: "150px",
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
    display: "block",
    cursor: "pointer",
  },
  related: {
    toolbar: HeadingSettings,
  },
};
