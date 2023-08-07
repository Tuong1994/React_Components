import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";

interface ImageViewProps {
  imgClass: string;
  view: string;
  alt: string;
  style?: React.CSSProperties;
  hasPreview: boolean;
  onPreview: () => void;
  onRemove?: () => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageView: React.ForwardRefRenderFunction<
  HTMLImageElement,
  ImageViewProps
> = (
  {
    view,
    alt,
    style,
    imgClass,
    hasPreview,
    onPreview,
    onRemove,
    setIsLoading,
  },
  ref
) => {
  return (
    <React.Fragment>
      <img
        ref={ref}
        src={view}
        alt={alt}
        style={style}
        className={`image-view ${imgClass}`}
        onLoad={() => setIsLoading(false)}
      />
      {hasPreview && (
        <div className="image-action">
          <FaEye className="action-icon" size={18} onClick={onPreview} />
          <FaTrash className="action-icon" size={18} onClick={onRemove} />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(ImageView);
