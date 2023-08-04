import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface NoteMessageProps {
  rootClass?: string;
  style?: React.CSSProperties;
  message?: string;
  type?: "basic" | "error";
  textStyle?: "none" | "italic";
}

const NoteMessage: React.ForwardRefRenderFunction<
  HTMLDivElement,
  NoteMessageProps
> = (
  { rootClass = "", style, message, type = "basic", textStyle = "none" },
  ref
) => {
  const typeClass = React.useMemo(() => {
    const types: ConditionRecord = {
      basic: "note-message-basic",
      error: "note-message-error",
    };
    return types[type];
  }, [type]);

  const textStyleClass = React.useMemo(() => {
    return textStyle === "italic" ? "note-message-italic" : "";
  }, [textStyle]);

  return (
    <div
      ref={ref}
      style={style}
      className={`note-message ${typeClass} ${textStyleClass} ${rootClass}`}
    >
      {message}
    </div>
  );
};

export default React.forwardRef(NoteMessage);
