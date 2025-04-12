import { BaseElementSettings } from "@/components/BaseComponents/BaseModalSettings";
import React from "react";

export const HeadingSettings = () => {
  return (
    <BaseElementSettings
      elementType="text"
      supportedStyles={[
        "color",
        "spacing",
        "layout",
        "border",
        "typography",
        "other",
      ]}
    />
  );
};
