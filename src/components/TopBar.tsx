"use client";
import React from "react";
import { useEditor } from "@craftjs/core";
import { EyeIcon } from "./Icons/EyeIcon";
import { SlashedEyeIcon } from "./Icons/SlashedEyeIcon";
import SaveButton from "./Demo/SaveButton";

export const Topbar = () => {
  const { actions, enabled, canUndo, canRedo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));

  return (
    <div className="px-4 py-2 bg-gray-100">
      <div className="flex items-center justify-between ">
        <label className="flex items-center gap-3 cursor-pointer ">
          <input
            className="hidden"
            checked={enabled}
            onChange={(event) =>
              actions.setOptions(
                (options) => (options.enabled = event.currentTarget.checked)
              )
            }
            type="checkbox"
          />
          {!enabled ? (
            <SlashedEyeIcon fill="black" />
          ) : (
            <EyeIcon fill="black" height={18} width={18} />
          )}
        </label>

        <div
          className={` transition-all duration-700  ${
            enabled
              ? "opacity-100 animate-in block"
              : "opacity-0  hidden animate-out"
          }`}
        >
          <SaveButton/>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
            disabled={!canUndo}
            onClick={() => actions.history.undo()}
          >
            Undo
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!canRedo}
            onClick={() => actions.history.redo()}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
};
