import React from "react";

interface DraggableProps {
  rootClass?: string;
  style?: React.CSSProperties;
  children?: string | React.ReactNode | React.ReactNode[];
}

const Draggable: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DraggableProps
> = ({ rootClass = "", style, children }, ref) => {
  const [touchX, setTouchX] = React.useState<number>(0);

  const [touchY, setTouchY] = React.useState<number>(0);

  const [isTouchDrag, setIsTouchDrag] = React.useState<boolean>(false);

  const [mouseX, setMouseX] = React.useState<number>(0);

  const [mouseY, setMouseY] = React.useState<number>(0);

  const [isMouseDrag, setIsMouseDrag] = React.useState<boolean>(false);

  const dragElRef = React.useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchX(
      e.touches[0].screenX - e.currentTarget.getBoundingClientRect().left
    );

    setTouchY(
      e.touches[0].screenY - e.currentTarget.getBoundingClientRect().top
    );

    setIsTouchDrag(true);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragElRef.current) return;

    if (isTouchDrag) {
      const left = e.touches[0].screenX -touchX;

      const top = e.touches[0].screenY -touchY;

      dragElRef.current.style.left = `${left}px`;

      dragElRef.current.style.top = `${top}px`;
    }
  };

  const onTouchEnd = () => setIsTouchDrag(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setMouseX(e.screenX - e.currentTarget.getBoundingClientRect().left);

    setMouseY(e.screenY - e.currentTarget.getBoundingClientRect().top);

    setIsMouseDrag(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!dragElRef.current) return;

    if (isMouseDrag) {
      const left = e.screenX - mouseX;

      const top = e.screenY - mouseY;

      dragElRef.current.style.left = `${left}px`;

      dragElRef.current.style.top = `${top}px`;
    }
  };

  const onMouseUp = () => setIsMouseDrag(false);

  return (
    <div ref={ref}>
      <div
        ref={dragElRef}
        style={style}
        className={`draggable ${rootClass}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(Draggable);
