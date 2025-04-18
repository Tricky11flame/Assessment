import React from "react";

export const ArrowUp: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <div>
      <svg viewBox="0 0 24 24" {...props}>
        <title>Arrow Up</title>
        <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
      </svg>
    </div>
  );
};
