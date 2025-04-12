import React from "react";
import { Element } from "@craftjs/core";
import { Heading } from "./HeadingComponent";

export const createDefaultHeading = () => {
  return <Element id="Heading" is={Heading} canvas />;
};
