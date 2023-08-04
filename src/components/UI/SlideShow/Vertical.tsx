import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { SlideItem } from "@/common/type/slideshow";
import { ConditionRecord } from "@/common/type/base";

export interface SlideVerticalProps {
  rootClass?: string;
  buttonClass?: string;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  buttonPrevIcon?: React.ReactNode;
  buttonNextIcon?: React.ReactNode;
  slideId?: string;
  items?: SlideItem[];
  time?: number;
  inifine?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
  theme?: "dark" | "light";
}

const heightSpan = 100;

let interval: any;

const SlideVertical: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SlideVerticalProps
> = (
  {
    rootClass = "",
    buttonClass = "",
    style,
    buttonStyle,
    buttonPrevIcon = <FaAngleUp size={20} />,
    buttonNextIcon = <FaAngleDown size={20} />,
    theme = "dark",
    slideId = "slide",
    items = [
      { id: "1", content: "content 1" },
      { id: "2", content: "content 2" },
      { id: "3", content: "content 3" },
    ],
    time = 5000,
    inifine,
    autoPlay,
    hasManualStop,
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
    if (inifine) return;
    if (slidePos === 0) return true;
  }, [inifine, slidePos]);

  const nextBtnDisabled = React.useMemo(() => {
    if (inifine) return;
    if (slidePos === items.length - 1) return true;
  }, [inifine, slidePos]);

  const themeClass = React.useMemo(() => {
    const themes: ConditionRecord = {
      dark: "slide-dark",
      light: "slide-light",
    };
    return themes[theme];
  }, [theme]);

  const translateFullSlide = (pos: number) => {
    const translate = -pos * heightSpan;
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(`${slideId}-${i}`);
      if (el) el.style.transform = `translateY(${translate}%)`;
    }
  };

  const translatePartialSlide = (pos: number) => {
    const currentPos = -slidePos * heightSpan;
    const translate = currentPos + pos;
    for (let i = 0; i < items.length; i++) {
      const el = document.getElementById(`${slideId}-${i}`);
      if (el) el.style.transform = `translateY(${translate}%)`;
    }
  };

  const handlePrevSlide = () => {
    let newPos = slidePos;
    if (newPos > 0) newPos -= 1;
    else if (inifine) newPos = items.length - 1;
    setSlidePos(newPos);
    translateFullSlide(newPos);
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (inifine) newPos = 0;
    setSlidePos(newPos);
    translateFullSlide(newPos);
  };

  const jumpToSlide = (pos: number) => {
    setSlidePos(pos);
    translateFullSlide(pos);
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

  const onTouchStart = (e: React.TouchEvent) => {
    speedAnimation("fast");
    handleManualStop();
    setTouchStartPos(e.touches[0].clientY);
    setTouchEndPos(e.touches[0].clientY);
    setIsTouched(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isTouched) {
      setTouchEndPos(e.touches[0].clientY);
      const containerHeight =
        document.getElementById("container")?.offsetHeight;
      if (containerHeight) {
        const pos =
          ((touchEndPos - touchStartPos) / containerHeight) * heightSpan;
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
    setMouseEndPos(e.clientY);
    setMouseStartPos(e.clientY);
    setIsClicked(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isClicked) {
      setMouseEndPos(e.clientY);
      const containerHeight =
        document.getElementById("container")?.offsetHeight;
      if (containerHeight) {
        const pos =
          ((mouseEndPos - mouseStartPos) / containerHeight) * heightSpan;
        translatePartialSlide(pos);
        setIsMouseSwiped(true);
      }
    }
  };

  const onMouseEnd = () => {
    if (isMouseSwiped) {
      if (mouseEndPos - mouseStartPos > -100) handlePrevSlide();
      else if (mouseEndPos - mouseStartPos < 100) handleNextSlide();
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
  }, [items]);

  const renderDots = React.useCallback(() => {
    return items.map((item, idx) => (
      <div
        key={item.id}
        className={`dots-item ${
          slidePos === idx ? "vertical-dots-item-active" : ""
        }`}
        onClick={() => jumpToSlide(idx)}
      ></div>
    ));
  }, [items]);

  return (
    <div
      ref={ref}
      style={style}
      className={`slide ${themeClass} ${rootClass}`}
    >
      <div className="vertical-action">
        <button
          type="button"
          className={`slide-action ${buttonClass}`}
          style={buttonStyle}
          disabled={prevBtnDisabled}
          onClick={onPrev}
        >
          {buttonPrevIcon}
        </button>
        <button
          type="button"
          className={`slide-action ${buttonClass}`}
          style={buttonStyle}
          disabled={nextBtnDisabled}
          onClick={onNext}
        >
          {buttonNextIcon}
        </button>
      </div>
      <div
        id="container"
        className="slide-container vertical-container"
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
      <div className="slide-dots vertical-dots">{renderDots()}</div>
    </div>
  );
};

export default React.forwardRef(SlideVertical);
