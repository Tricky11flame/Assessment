import { useEditor } from "@craftjs/core";
import { useState } from "react";
import { Button } from "./Demo/Button";
import { Text } from "./Demo/Text";
import { ToolboxButton } from "./BaseComponents/ToolboxButton";
import { ButtonIcon } from "./Icons/ButtonIcon";
import { Sidebar, SidebarBody } from "./ui/sidebar";
import { createDefaultContainer } from "./Demo/Container";
import { createDefaultHeading } from "./Demo/Heading";

import { TextIcon } from "./Icons/TextIcon";

export const toolboxItems = [
  {
    name: "Button",
    component: <Button>Hey there</Button>,
    icon: <ButtonIcon className="w-10 h-10" />,
  },
  {
    name: "Text",
    component: <Text content="Hi world" />,
    icon: <TextIcon className="w-10 h-10" />,
  },
  {
    name: "Container",
    component: createDefaultContainer(),
    dataCy: "toolbox-container",
  },
  {
    name: "Heading",
    component: createDefaultHeading(),
    dataCy: "toolbox-heading",
  }
];

export const Toolbox = () =>
  // { style }: { style: any }
  {
    const { connectors } = useEditor();
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = toolboxItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className={`gap-2 toolbox bg-gray-900 text-white `}>
          <div className="px-2">
            <h3 className="text-lg font-semibold mb-4">Drag to add</h3>
            <input
              type="text"
              placeholder="Search Component..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4 p-2 w-full bg-transparent border border-gray-600 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 overflow-y-auto px-2">
            {filteredItems.map((item, index) => (
              <ToolboxButton
                key={index}
                props={{
                  ref: (ref: HTMLDivElement | null) => {
                    if (ref) connectors.create(ref, item.component);
                  },
                  ...(item.dataCy && { "data-cy": item.dataCy }),
                }}
              >
                {item?.icon}
                {item?.name}
              </ToolboxButton>
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
    );
  };
