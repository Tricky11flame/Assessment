import React, { ReactElement } from "react";
import { ArrowIcon } from "./Icons/Arrow";

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon: ReactElement;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
  className?: string;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange,
  className,
}) => {
  return (
    <div
      className={`flex flex-col border-b transition-all duration-100 ${
        visible ? `h-${height} border-gray-300` : "h-fit border-transparent"
      } ${className}`}
    >
      <div
        onClick={() => {
          if (onChange) onChange(!visible);
        }}
        className={`cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 h-11 ${
          visible ? "shadow-sm" : ""
        }`}
      >
        <div className="flex-1 flex items-center">
          {icon}
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <button
          className={`transform transition-transform w-3 duration-100 ${
            visible ? "rotate-180" : "rotate-0"
          }`}
        >
          <ArrowIcon fill="#707070" viewBox="-2 -1 12 12" />
        </button>
      </div>
      {visible ? (
        <div className="w-full flex-1 overflow-auto">{children}</div>
      ) : null}
    </div>
  );
};
