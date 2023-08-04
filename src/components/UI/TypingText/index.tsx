import React from "react";
import { ConditionRecord } from "@/common/type/base";

export interface TypingTextProps {
  rootClass?: string;
  style?: React.CSSProperties;
  texts?: string[];
  size?: number;
  theme?: "dark" | "light";
  color?: "red" | "blue" | "green" | "orange";
}

enum TypingPhase {
  Typing,
  Pause,
  Delete,
}

const TYPING_MS = 150;

const PAUSING_MS = 1000;

const DELETE_MS = 50;

const TypingText: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TypingTextProps
> = (
  {
    rootClass = "",
    style,
    texts = ["Frontend Developer", "Backend Developer", "Fullstack developer"],
    theme = "dark",
    size = 50,
    color,
  },
  ref
) => {
  const [typingText, setTypingText] = React.useState<string>("Typing text");

  const [selectIdx, setSelectIdx] = React.useState<number>(0);

  const [phase, setPhase] = React.useState<number>(TypingPhase.Typing);

  React.useEffect(() => {
    switch (phase) {
      case TypingPhase.Typing: {
        const nextTypingText = texts[selectIdx]?.slice(
          0,
          typingText?.length + 1
        );

        if (nextTypingText === typingText) return setPhase(TypingPhase.Pause);

        const timeout = setTimeout(
          () => setTypingText(nextTypingText),
          TYPING_MS
        );

        return () => clearTimeout(timeout);
      }

      case TypingPhase.Delete: {
        if (!typingText) {
          const nextIdx = selectIdx + 1;
          setSelectIdx(texts[selectIdx] ? nextIdx : 0);
          setPhase(TypingPhase.Typing);
          return;
        }

        const nextRemainText = texts[selectIdx]?.slice(
          0,
          typingText?.length - 1
        );

        const timeout = setTimeout(
          () => setTypingText(nextRemainText),
          DELETE_MS
        );

        return () => clearTimeout(timeout);
      }

      default: {
        const timeout = setTimeout(
          () => setPhase(TypingPhase.Delete),
          PAUSING_MS
        );

        return () => clearTimeout(timeout);
      }
    }
  }, [texts, typingText, phase, selectIdx]);

  const colorClass = React.useMemo(() => {
    const colors: ConditionRecord = {
      red: "typing-text-red",
      blue: "typing-text-blue",
      green: "typing-text-green",
      orange: "typing-text-orange",
    };
    return colors[color ?? ""] ?? "";
  }, [color]);

  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      dark: "typing-text-dark",
      light: "typing-text-light",
    };
    return themes[theme];
  }, [theme]);

  return (
    <div
      ref={ref}
      style={{ ...style, height: `${size}px` }}
      className={`typing-text ${themeClass} ${colorClass} ${rootClass}`}
    >
      <span
        style={{ fontSize: `${size}px`, lineHeight: `${size}px` }}
        className="text-view"
      >
        {typingText}
      </span>
      <span className="text-line"></span>
    </div>
  );
};

export default TypingText;
