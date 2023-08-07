import React from "react";
import { FileUpload } from "@/common/type/form";
import Divider from "@/components/UI/Divider";
import Image from "@/components/UI/Image";

interface PreviewAreaProps {
  previewFiles: FileUpload[];
  defaultFiles: FileUpload[];
  handleRemove: (type: "default" | "upload", file: FileUpload) => void;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  previewFiles,
  defaultFiles,
  handleRemove,
}) => {
  return (
    <React.Fragment>
      {previewFiles.length > 0 && (
        <React.Fragment>
          <Divider contentPlacement="left">Uploaded images</Divider>

          <div className="upload-images">
            {previewFiles.map((preview) => (
              <Image
                fit="cover"
                rootClass="images-view"
                hasPreview
                key={preview.id}
                src={preview.url}
                onRemove={() => handleRemove("upload", preview)}
              />
            ))}
          </div>
        </React.Fragment>
      )}

      {defaultFiles.length > 0 && (
        <React.Fragment>
          <Divider contentPlacement="left">Default images</Divider>

          <div className="upload-images">
            {defaultFiles.map((preview) => (
              <Image
                fit="cover"
                rootClass="images-view"
                key={preview.id}
                hasPreview
                src={preview.url}
                onRemove={() => handleRemove("default", preview)}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PreviewArea;
