import React from "react";
import Image from "../Image";
import PreviewImageAction from "./Action";
import Draggable from "../Draggable";
import useRender from "@/common/hooks/useRender";
import useOverflow from "@/common/hooks/useOverflow";
import useReponsive from "@/common/hooks/useReponsive";

export interface PreviewImageProps {
  rootClass?: string;
  style?: React.CSSProperties;
  src?: string;
  open?: boolean;
  onClose?: () => void;
}

export interface ImageSize {
  width: number;
  height: number;
}

const PreviewImage: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PreviewImageProps
> = ({ rootClass = "", style, open = false, src, onClose }, ref) => {
  const { isPhone, isTablet, isLaptop, isDesktop } = useReponsive();

  const [size, setSize] = React.useState<ImageSize>({
    width: 500,
    height: 500,
  });

  const [rotateDeg, setRotateDeg] = React.useState<number>(0);

  const imageRef = React.useRef<HTMLDivElement>(null);

  const render = useRender(open);

  useOverflow(open);

  React.useEffect(() => {
    if (!imageRef.current) return;
    imageRef.current.style.width = `${size.width}px`;

    imageRef.current.style.height = `${size.height}px`;
  }, [size]);

  React.useEffect(() => {
    if (isPhone) setSize({ width: 300, height: 300 });
    if (isTablet || isLaptop || isDesktop) setSize({ width: 500, height: 500 });
  }, [isPhone, isTablet, isLaptop, isDesktop]);

  const handleMagnify = (type: "plus" | "minus") => {
    if (type === "plus") {
      if (size.width < 1000 && size.height < 1000)
        setSize({
          ...size,
          width: size.width + 100,
          height: size.height + 100,
        });
    }

    if (type === "minus") {
      if (size.width > 500 && size.height > 500)
        setSize({
          ...size,
          width: size.width - 100,
          height: size.height - 100,
        });
    }
  };

  const handleRotate = () => {
    if (!imageRef.current) return;

    let currentDeg = rotateDeg + 90;

    imageRef.current.style.transform = `rotate(-${currentDeg}deg)`;

    setRotateDeg((prev) => prev + 90);
  };

  return render ? (
    <div
      ref={ref}
      style={style}
      className={`preview-image ${
        open ? "preview-image-active" : ""
      } ${rootClass}`}
    >
      <PreviewImageAction
        size={size}
        handleMagnify={handleMagnify}
        handleRotate={handleRotate}
        onClose={onClose}
      />

      <div className="image-area">
        <Draggable>
          <div ref={imageRef} className="area-view">
            <Image fit="contain" src={src} />
          </div>
        </Draggable>
      </div>
    </div>
  ) : null;
};

export default React.forwardRef(PreviewImage);
