import React from "react";
import { GrRotateLeft } from "react-icons/gr";
import { PiMagnifyingGlassMinus, PiMagnifyingGlassPlus } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { ImageSize } from ".";
import Space from "../Space";

interface PreviewImageActionProps {
  size: ImageSize;
  handleRotate: () => void;
  handleMagnify: (type: "plus" | "minus") => void;
  onClose?: () => void;
}

const PreviewImageAction: React.FC<PreviewImageActionProps> = ({
  size,
  handleRotate,
  handleMagnify,
  onClose,
}) => {
  const isPlusDisabled = React.useMemo(
    () => size.width === 1000 && size.height === 1000,
    [size.width, size.height]
  );

  const isMinusDisabled = React.useMemo(
    () => size.width === 500 && size.height === 500,
    [size.width, size.height]
  );

  return (
    <div className="image-header">
      <Space size="md">
        <button className="header-action" draggable onClick={handleRotate}>
          <GrRotateLeft size={17} />
        </button>

        <button
          disabled={isPlusDisabled}
          className={`header-action ${
            isPlusDisabled ? "header-action-disabled" : ""
          }`}
          onClick={() => handleMagnify("plus")}
        >
          <PiMagnifyingGlassPlus size={17} />
        </button>

        <button
          disabled={isMinusDisabled}
          className={`header-action ${
            isMinusDisabled ? "header-action-disabled" : ""
          }`}
          onClick={() => handleMagnify("minus")}
        >
          <PiMagnifyingGlassMinus size={17} />
        </button>

        <button className="header-action" onClick={onClose}>
          <FaTimes size={16} />
        </button>
      </Space>
    </div>
  );
};

export default PreviewImageAction;
