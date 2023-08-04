import React from "react";
import { FaAngleRight, FaAngleLeft, FaList } from "react-icons/fa";
import { SlideItem } from "@/common/type/slideshow";

export interface SlideProductProps {
  rootClass?: string;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  buttonPrevIcon?: React.ReactNode;
  buttonNextIcon?: React.ReactNode;
  slideId?: string;
  items?: SlideItem[];
  time?: number;
  infinite?: boolean;
  autoPlay?: boolean;
  hasManualStop?: boolean;
}

const widthSpan = 100;

let interval: any;

const SlideProduct: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SlideProductProps
> = (
  {
    rootClass = "",
    style,
    buttonStyle,
    buttonPrevIcon = <FaAngleLeft size={25} />,
    buttonNextIcon = <FaAngleRight size={25} />,
    slideId = "slideProduct",
    items = [
      { id: "1", content: "content 1" },
      { id: "2", content: "content 2" },
      { id: "3", content: "content 3" },
      { id: "4", content: "content 4" },
      { id: "5", content: "content 5" },
    ],
    time = 5000,
    autoPlay,
    infinite,
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

  const [isShow, setIsShow] = React.useState<boolean>(false);

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
    translateFullSlide(newPos);
    setSlidePos(newPos);
  };

  const handleNextSlide = () => {
    let newPos = slidePos;
    if (newPos < items.length - 1) newPos += 1;
    else if (infinite) newPos = 0;
    translateFullSlide(newPos);
    setSlidePos(newPos);
  };

  const jumpToSlide = (pos: number) => {
    translateFullSlide(pos);
    setSlidePos(pos);
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
    handleManualStop();
    speedAnimation("fast");
    setTouchEndPos(e.touches[0].clientX);
    setTouchStartPos(e.touches[0].clientX);
    setIsTouched(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isTouched) {
      setTouchEndPos(e.touches[0].clientX);
      const containerWidth =
        document.getElementById("containerProduct")?.offsetWidth;
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
      if (touchEndPos - touchStartPos > -75) handlePrevSlide();
      else if (touchEndPos - touchStartPos < 75) handleNextSlide();
      else jumpToSlide(slidePos);
    }
    speedAnimation("slow");
    setIsTouched(false);
    setIsTouchSwiped(false);
    setManualStop(true);
  };

  const onMouseStart = (e: React.MouseEvent) => {
    e.preventDefault();
    handleManualStop();
    speedAnimation("fast");
    setMouseEndPos(e.clientX);
    setMouseStartPos(e.clientX);
    setIsClicked(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isClicked) {
      setMouseEndPos(e.clientX);
      const containerWidth =
        document.getElementById("containerProduct")?.offsetWidth;
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

  const renderImages = React.useCallback(() => {
    return items.map((item, idx) => (
      <div
        key={item.id}
        className={`image-item ${slidePos === idx ? "image-item-active" : ""}`}
        onClick={() => jumpToSlide(idx)}
      >
        {item.content}
      </div>
    ));
  }, [items]);

  return (
    <div ref={ref} style={style} className={`slide-product ${rootClass}`}>
      <div className="slide-product-image">{renderImages()}</div>

      <div
        id="containerProduct"
        className="slide-product-container"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseStart}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        onMouseLeave={onMouseEnd}
      >
        <button
          className="container-action"
          style={buttonStyle}
          disabled={prevBtnDisabled}
          onClick={onPrev}
        >
          {buttonPrevIcon}
        </button>
        <button
          className="container-action"
          style={buttonStyle}
          disabled={nextBtnDisabled}
          onClick={onNext}
        >
          {buttonNextIcon}
        </button>

        {renderSlide()}

        <button
          className="container-image-action"
          onClick={() => setIsShow(!isShow)}
        >
          <FaList size={25} />
          <div
            className={`action-inner ${isShow ? "action-inner-active" : ""}`}
          >
            {renderImages()}
          </div>
        </button>
      </div>
    </div>
  );
};

export default React.forwardRef(SlideProduct);
