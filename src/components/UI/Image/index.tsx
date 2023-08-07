import React from "react";
import { ConditionRecord } from "@/common/type/base";
import { Spinner } from "../Loading";
import Modal from "../Modal";
import ImageView from "./View";

export interface ImageProps {
  rootClass?: string;
  imgClass?: string;
  src?: string;
  alt?: string;
  hasPreview?: boolean;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "auto";
  fit?: "cover" | "contain" | "fill" | "none";
  onRemove?: () => void;
}

interface PreviewState {
  active: boolean;
  url: string;
}

const Image: React.ForwardRefRenderFunction<HTMLImageElement, ImageProps> = (
  {
    rootClass = "",
    imgClass = "",
    style,
    imgStyle,
    src = require("../../../images/gallery/gallery_1.jpg"),
    alt = "image",
    size = "auto",
    fit = "none",
    hasPreview = false,
    onRemove,
  },
  ref
) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [view, setView] = React.useState<string>("");

  const [isPreview, setIsPreview] = React.useState<PreviewState>({
    active: false,
    url: src,
  });

  const imageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (window["IntersectionObserver"]) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setView(src);
          if (imageRef && imageRef.current)
            observer.unobserve(imageRef.current);
        }
      });

      if (imageRef && imageRef.current) observer.observe(imageRef.current);
    } else setView(src);
  }, [src]);

  const sizeClass = React.useMemo(() => {
    const sizes: ConditionRecord = {
      xs: "image-xs",
      sm: "image-sm",
      md: "image-md",
      lg: "image-lg",
      xl: "image-xl",
    };

    return sizes[size] ?? "";
  }, [size]);

  const fitClass = React.useMemo(() => {
    const fits: ConditionRecord = {
      cover: "image-cover",
      contain: "image-contain",
      fill: "image-fill",
    };

    return fits[fit] ?? "";
  }, [fit]);

  const onPreview = () =>
    setIsPreview({ ...isPreview, active: true, url: src });

  const onCancel = () => setIsPreview({ ...isPreview, active: false });

  return (
    <React.Fragment>
      <div className={`image ${sizeClass} ${fitClass} ${rootClass}`}>
        {isLoading && !view ? (
          <div ref={imageRef} className="image-loading">
            <Spinner />
          </div>
        ) : (
          <ImageView
            ref={ref}
            imgClass={imgClass}
            style={imgStyle}
            view={view}
            alt={alt}
            hasPreview={hasPreview}
            onPreview={onPreview}
            onRemove={onRemove}
            setIsLoading={setIsLoading}
          />
        )}
      </div>

      <Modal size="lg" open={isPreview.active} onCancel={onCancel}>
        <img src={isPreview.url} alt={alt} />
      </Modal>
    </React.Fragment>
  );
};

export default React.forwardRef(Image);
