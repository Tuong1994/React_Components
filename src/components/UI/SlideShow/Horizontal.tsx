import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SlideItem } from "@/common/type/slideshow";
import { ConditionRecord } from "@/common/type/base";

export interface SlideHorizontalProps {
  rootClass?: string;
  buttonClass?: string;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  buttonPrevIcons?: React.ReactNode;
  buttonNextIcons?: React.ReactNode;
  items?: SlideItem[];
  slideId?: string;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  time?: number;
  theme?: "light" | "dark";
}

const widthSpan = 100;

let interval: any;

const SlideHorizontal: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SlideHorizontalProps
> = (
  {
    infinite,
    autoPlay,
    hasManualStop,
    time = 5000,
    rootClass = "",
    buttonClass = "",
    style,
    buttonStyle,
    buttonPrevIcons = <FaAngleLeft size={20} />,
    buttonNextIcons = <FaAngleRight size={20} />,
    slideId = "slide",
    theme = "dark",
    items = [
      { id: "1", content: "content 1" },
      { id: "2", content: "content 2" },
      { id: "3", content: "content 3" },
    ],
  },
  ref
) => {
  const [slidePos, setSlidePos] = React.useState<number>(0);

  const [touchStartPos, setTouchStartPos] = React.useState<number>(0);
  const [touchEndPos, setTouchEndPos] = React.useState<number>(0);
  const [isTouched, setIsTouched] = React.useState<boolean>(false);
  const [isTouchSwiped, setIsTouchSwiped] = React.useState<boolean>(false);

  const [mouseStartPos, setMouseStartPos] = React.useState<number>(0);
  const [mouseEndPos, setMouseEndPos] = React.useState<number>(0);
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [isMouseSwiped, setIsMouseSwiped] = React.useState<boolean>(false);

  const [manualStop, setManualStop] = React.useState<boolean>(
    time !== undefined
  );

  React.useEffect(() => {
    if (autoPlay) {
      if (manualStop && !isClicked && !isTouched) {
        interval = setInterval(() => handleNextSlide(), time);
      }
    }
    return () => clearInterval(interval);
  });

  const prevBtnDisabled = React.useMemo(() => {
    if (infinite) return;
    if (slidePos === 0) return true;
  }, [infinite, slidePos]);

  const nextBtnDisabled = React.useMemo(() => {
    if (infinite) return;
    if (slidePos === items.length - 1) return true;
  }, [infinite, slidePos]);

  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      dark: "slide-dark",
      light: "slide-light",
    };
    return themes[theme];
  }, [theme]);

  const translateFullSlide = (pos: number) => {
    const translate = -pos * widthSpan;
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(`${slideId}-${i}`);
      if (el) el.style.transform = `translateX(${translate}%)`;
    }
  };

  const translatePartialSlide = (pos: number) => {
    const currentPos = -slidePos * widthSpan;
    const translate = currentPos + pos;
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(`${slideId}-${i}`);
      if (el) el.style.transform = `translateX(${translate}%)`;
    }
  };

  const handlePrevSlide = () => {
    let newPos = slidePos;
    if (newPos > 0) newPos -= 1;
    else if (infinite) newPos = items.length - 1;
    setSlidePos(newPos);
    translateFullSlide(newPos);
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (infinite) newPos = 0;
    setSlidePos(newPos);
    translateFullSlide(newPos);
  };

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFullSlide(pos);
  };

  const handleManualStop = () => {
    clearInterval(interval);
    if (hasManualStop) setManualStop(false);
  };

  const onPrev = () => {
    handlePrevSlide();
    handleManualStop();
  };

  const onNext = () => {
    handleNextSlide();
    handleManualStop();
  };

  const speedAnimation = (type: "fast" | "slow") => {
    for (
      let i = Math.min(0, slidePos - 2);
      i < Math.max(items.length, slidePos + 3);
      i++
    ) {
      const el = document.getElementById(`${slideId}-${i}`);
      if (el) {
        if (type === "fast") el.classList.add("container-item-fast");
        else el.classList.remove("container-item-fast");
      }
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    speedAnimation("fast");
    handleManualStop();
    setTouchEndPos(e.touches[0].clientX);
    setTouchStartPos(e.touches[0].clientX);
    setIsTouched(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isTouched) {
      setTouchEndPos(e.touches[0].clientX);
      const containerWidth = document.getElementById("container")?.offsetWidth;
      if (containerWidth) {
        const pos =
          ((touchEndPos - touchStartPos) / containerWidth) * widthSpan;
        translatePartialSlide(pos);
        setIsTouchSwiped(true);
      }
    }
  };

  const onTouchEnd = () => {
    if (isTouchSwiped) {
      if (touchEndPos - touchStartPos > 75) handlePrevSlide();
      else if (touchEndPos - touchStartPos < -75) handleNextSlide();
      else jumpToSlide(slidePos);
    }
    speedAnimation("slow");
    setIsTouched(false);
    setIsTouchSwiped(false);
    setManualStop(true);
  };

  const onMouseStart = (e: React.MouseEvent) => {
    e.preventDefault();
    speedAnimation("fast");
    handleManualStop();
    setMouseEndPos(e.clientX);
    setMouseStartPos(e.clientX);
    setIsClicked(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isClicked) {
      setMouseEndPos(e.clientX);
      const containerWidth = document.getElementById("container")?.offsetWidth;
      if (containerWidth) {
        const pos =
          ((mouseEndPos - mouseStartPos) / containerWidth) * widthSpan;
        translatePartialSlide(pos);
        setIsMouseSwiped(true);
      }
    }
  };

  const onMouseEnd = () => {
    if (isMouseSwiped) {
      if (mouseEndPos - mouseStartPos > 100) handlePrevSlide();
      else if (mouseEndPos - mouseStartPos < -100) handleNextSlide();
      else jumpToSlide(slidePos);
    }
    speedAnimation("slow");
    setIsClicked(false);
    setIsMouseSwiped(false);
    setManualStop(true);
  };

  const renderSlide = React.useCallback(() => {
    return items.map((item, idx) => (
      <div key={item.id} id={`${slideId}-${idx}`} className="container-item">
        {item.content}
      </div>
    ));
  }, [slideId, items]);

  const renderDots = React.useCallback(() => {
    return items.map((item, idx) => (
      <div
        key={item.id}
        className={`dots-item ${slidePos === idx ? "dots-item-active" : ""}`}
        onClick={() => jumpToSlide(idx)}
      ></div>
    ));
  }, [slideId, items]);

  return (
    <div
      ref={ref}
      style={style}
      className={`slide ${themeClass} ${rootClass}`}
    >
      <button
        type="button"
        disabled={prevBtnDisabled}
        className={`slide-action ${buttonClass}`}
        style={buttonStyle}
        onClick={onPrev}
      >
        {buttonPrevIcons}
      </button>

      <button
        type="button"
        disabled={nextBtnDisabled}
        className={`slide-action ${buttonClass}`}
        style={buttonStyle}
        onClick={onNext}
      >
        {buttonNextIcons}
      </button>

      <div
        id="container"
        className="slide-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseStart}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        onMouseLeave={onMouseEnd}
      >
        {renderSlide()}
      </div>

      <div className="slide-dots">{renderDots()}</div>
    </div>
  );
};

export default React.forwardRef(SlideHorizontal);
