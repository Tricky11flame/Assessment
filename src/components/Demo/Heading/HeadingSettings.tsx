import React from "react";
import { BaseElementSettings } from "../../BaseComponents/BaseModalSettings";
import { ToolbarSection } from "../../Toolbar/ToolbarSection";

export const HeadingSettings = () => {
  return (
    <BaseElementSettings
      elementType="Heading"
      supportedStyles={[
        "color",
        "spacing",
        "layout",
        "border",
        "typography",
        "other",
      ]}  
    >
      {/* Custom Section for Decoration Settings */}
      <ToolbarSection title="Decoration" />
    </BaseElementSettings>
  );
};