// Demo/Heading/index.tsx
import React from "react";
import { Element } from "@craftjs/core";
import { Heading } from "./HeadingComponent";

export const createDefaultHeading = () => {
  return (
    <Element
      id="Heading"
      is={Heading }
      content="Default Heading Text"  // Provide default content here
      canvas
    />
  );
};
