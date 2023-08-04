import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { ConditionRecord } from "@/common/type/base";
import Modal from "../Modal";

export interface ImageProps {
  rootClass?: string;
  src?: string;
  alt?: string;
  hasPreview?: boolean;
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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
    style,
    src = require("../../../images/gallery/gallery_1.jpg"),
    alt = "image",
    size = "sm",
    fit = "none",
    hasPreview = false,
    onRemove,
  },
  ref
) => {
  const [isPreview, setIsPreview] = React.useState<PreviewState>({
    active: false,
    url: src,
  });

  React.useEffect(() => {
    if (!window["IntersectionObserver"]) {
      const imageEl = document.getElementById("image") as HTMLImageElement;
      return loadImages(imageEl);
    }

    const images = document.querySelectorAll("[data-src]");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImages(entry.target as HTMLImageElement);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7,
        rootMargin: "0px 0px 0px 0px",
      }
    );

    images.forEach((image) => observer.observe(image));

    return () => images.forEach((image) => observer.unobserve(image));
  }, []);

  const loadImages = (imageEl: HTMLImageElement) => {
    if (imageEl) {
      imageEl.src = imageEl.dataset.src ?? "";
      imageEl.style.opacity = "1";
      imageEl.style.background = "transparent";
      imageEl.style.animation = "fadeIn 0.4s linear 1";
    }
  };

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
        <img
          id="image"
          ref={ref}
          data-src={src}
          alt={alt}
          style={style}
          className={`image-view ${sizeClass} ${fitClass} ${rootClass}`}
        />
        {hasPreview && (
          <div className="image-action">
            <FaEye className="action-icon" size={18} onClick={onPreview} />
            <FaTrash className="action-icon" size={18} onClick={onRemove} />
          </div>
        )}
      </div>

      <Modal size="lg" open={isPreview.active} onCancel={onCancel}>
        <img src={isPreview.url} alt={alt} />
      </Modal>
    </React.Fragment>
  );
};

export default React.forwardRef(Image);
