import React from "react";
import { Image, NoteMessage } from "@/components/UI";
import { FaPlus } from "react-icons/fa";
import { ConditionRecord } from "@/common/type/base";
import { ACCEPT_FILE_TYPE, FILE_SIZE } from "@/common/constant/upload";

export interface SingleImageUploadProps {
  rootClass?: string;
  style?: React.CSSProperties;
  errorMessage?: string;
  fileSize?: number;
  defaultUrl?: string;
  shape?: "circle" | "square";
  variant?: "info" | "success" | "warning";
  onChange?: (file: File | null) => void;
}

const SingleImageUpload: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SingleImageUploadProps
> = (
  {
    rootClass = "",
    style,
    fileSize = FILE_SIZE,
    defaultUrl = "",
    shape = "square",
    variant = "info",
    errorMessage,
    onChange,
  },
  ref
) => {
  const [file, setFile] = React.useState<File | null>(null);

  const [previewFile, setPreviewFile] = React.useState<string>(defaultUrl);

  const [error, setError] = React.useState<boolean>(false);

  const [isDragActive, setIsDragActive] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const defaultErrorMessage = React.useMemo(() => {
    const acceptType = ACCEPT_FILE_TYPE.map((type) => type.split("/")[1])
      .join("/")
      .toUpperCase();

    const size = fileSize / (1024 * 1024);

    return `File size must less than or equal to ${size}MB and only accept file type ${acceptType}`;
  }, [ACCEPT_FILE_TYPE, fileSize]);

  const shapeClass = React.useMemo(() => {
    const shapes: ConditionRecord = {
      circle: "upload-group-circle",
      square: "upload-group-square",
    };
    return shapes[shape];
  }, [shape]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      info: "upload-group-info",
      success: "upload-group-success",
      warning: "upload-group-warning",
    };
    return variants[variant];
  }, [variant]);

  React.useEffect(() => {
    onChange && onChange(file);

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => setPreviewFile(reader.result as string);

    reader.readAsDataURL(file);

    setError(false);
  }, [file]);

  // Handle upload image
  const handleUpload = (file: File) => {
    if (!ACCEPT_FILE_TYPE.includes(file?.type)) return setError(true);

    if (file?.size > fileSize) return setError(true);

    setFile(file);
  };

  // Hanlde change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    let fileValue: File = e.target.files[0];

    handleUpload(fileValue);
  };

  // Handle drag
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.stopPropagation();

    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      let fileValue: File = e.dataTransfer.files[0];

      handleUpload(fileValue);
    }
  };

  // Handle remove
  const handleRemove = () => {
    setPreviewFile("");

    setFile(null);

    if (file && inputRef.current && inputRef.current.files) {
      const uploadedFiles: File[] = Array.from(inputRef.current.files);

      const filterFiles = uploadedFiles.filter((f) => f.name !== file.name);

      const dataTransfer = new DataTransfer();

      filterFiles.forEach((f) => {
        const remainFile = new File([f.name], f.name);

        dataTransfer.items.add(remainFile);
      });

      inputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <div ref={ref} style={style} className={`single-image-upload ${rootClass}`}>
      <div
        className={`upload-group ${
          isDragActive ? "dragover" : ""
        } ${variantClass} ${shapeClass}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {!previewFile ? (
          <label className="group-control">
            <input
              type="file"
              className="control-input"
              accept={ACCEPT_FILE_TYPE.join(",")}
              ref={inputRef}
              onChange={handleChange}
            />

            <FaPlus size={20} />
          </label>
        ) : (
          <Image
            fit="cover"
            hasPreview
            src={previewFile}
            onRemove={handleRemove}
          />
        )}
      </div>

      {error && (
        <NoteMessage
          type="error"
          textStyle="italic"
          message={errorMessage ?? defaultErrorMessage}
        />
      )}
    </div>
  );
};

export default React.forwardRef(SingleImageUpload);
