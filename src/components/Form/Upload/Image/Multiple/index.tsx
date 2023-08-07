import React from "react";
import { ACCEPT_FILE_TYPE, FILE_SIZE } from "@/common/constant/upload";
import { ConditionRecord } from "@/common/type/base";
import { Paragraph } from "@/components/UI/Typography";
import { FaUpload } from "react-icons/fa";
import { FileUpload } from "@/common/type/form";
import { NoteMessage } from "@/components/UI";
import PreviewArea from "./PreviewArea";
import helper from "@/utils/helper";

export interface MultipleImageUploadProps {
  rootClass?: string;
  style?: React.CSSProperties;
  variant?: "info" | "success" | "warning";
  defaultUrls?: string[];
  errorMessage?: string;
  fileSize?: number;
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  onRemoveDefaultUrls?: (urls: string[]) => void;
}

interface Error {
  type: "default" | "max";
  isActive: boolean;
}

const MultipleImageUpload: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MultipleImageUploadProps
> = (
  {
    rootClass = "",
    style,
    variant = "info",
    defaultUrls = [],
    fileSize = FILE_SIZE,
    maxFiles,
    errorMessage,
    onChange,
    onRemoveDefaultUrls,
  },
  ref
) => {
  const [files, setFiles] = React.useState<FileUpload[]>([]);

  const [previewFiles, setPreviewFiles] = React.useState<FileUpload[]>([]);

  const [defaultFiles, setDefaultFiles] = React.useState<FileUpload[]>([]);

  const [error, setError] = React.useState<Error>({
    type: "default",
    isActive: false,
  });

  const [isDragActive, setIsDragActive] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const defaultErrorMessage = React.useMemo(() => {
    if (error.type === "default") {
      const acceptType = ACCEPT_FILE_TYPE.map((type) => type.split("/")[1])
        .join("/")
        .toUpperCase();

      const size = fileSize / (1024 * 1024);

      return `File size must less than or equal to ${size}MB and only accept file type ${acceptType}`;
    }

    return `Can only upload ${maxFiles} files`;
  }, [ACCEPT_FILE_TYPE, fileSize, error.type]);

  const variantClass = React.useMemo(() => {
    const variants: ConditionRecord = {
      info: "upload-group-info",
      success: "upload-group-success",
      warning: "upload-group-warning",
    };
    return variants[variant];
  }, [variant]);

  React.useEffect(() => {
    if (defaultUrls && defaultUrls.length) {
      setDefaultFiles(
        [...defaultUrls].map((url) => ({ id: helper.uuid(), url }))
      );
    }
  }, [defaultUrls]);

  React.useEffect(() => {
    onChange && onChange(files.map((f) => f.file as File));

    const previews = [...files].map((f) => ({
      id: f.id,
      name: f.name,
      url: URL.createObjectURL(f.file as File),
    }));

    setPreviewFiles(previews);

    setError({ type: "default", isActive: false });
  }, [files]);

  // Handle upload file
  const handleUpload = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!ACCEPT_FILE_TYPE.includes(file.type))
        return setError({ type: "default", isActive: true });

      if (file.size > fileSize)
        return setError({ type: "default", isActive: true });

      if (maxFiles)
        if (previewFiles.length === maxFiles)
          return setError({ type: "max", isActive: true });
    }

    const fileValues: FileUpload[] = files.map((f) => ({
      id: helper.uuid(),
      name: f.name,
      file: f,
    }));

    if (files.length === 0) setFiles(fileValues);
    else setFiles((prev) => [...prev, ...fileValues]);
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const uploadFiles = Array.from(e.target.files);

    handleUpload(uploadFiles);
  };

  // Handle drag
  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    e.stopPropagation();

    setIsDragActive(false);

    if (e.dataTransfer.files) {
      const uploadFiles = Array.from(e.dataTransfer.files);

      handleUpload(uploadFiles);
    }
  };

  // Handle Remove
  const handleRemove = (type: "default" | "upload", file: FileUpload) => {
    // Remove upload image
    if (type === "upload") {
      setPreviewFiles(
        [...previewFiles].filter((preview) => preview.id !== file.id)
      );

      setFiles([...files].filter((f) => f.id !== file.id));

      if (files && inputRef.current && inputRef.current.files) {
        const uploadedFiles = Array.from(inputRef.current.files);

        const filterFiles = uploadedFiles.filter((f) => f.name !== file.name);

        const dataTransfer = new DataTransfer();

        filterFiles.forEach((f) => {
          const remainFile: File = new File([f.name], f.name);

          dataTransfer.items.add(remainFile);
        });

        inputRef.current.files = dataTransfer.files;
      }
    }
    // Remove default image
    else {
      const remainFile = [...defaultFiles].filter((f) => f.id !== file.id);

      setDefaultFiles(remainFile);

      onRemoveDefaultUrls &&
        onRemoveDefaultUrls(remainFile.map((f) => f.url as string));
    }
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`multiple-image-upload ${rootClass}`}
    >
      <label
        className={`upload-control ${
          isDragActive ? "dragover" : ""
        } ${variantClass}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputRef}
          multiple
          accept={ACCEPT_FILE_TYPE.join(",")}
          className="control-input"
          onChange={handleChange}
        />
        <div className="control-label">
          <FaUpload size={25} className="label-icon" />
          <Paragraph>Click or drag image to this area to upload</Paragraph>
        </div>
      </label>

      {error.isActive && (
        <NoteMessage
          type="error"
          textStyle="italic"
          message={errorMessage ?? defaultErrorMessage}
        />
      )}

      <PreviewArea
        defaultFiles={defaultFiles}
        previewFiles={previewFiles}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default React.forwardRef(MultipleImageUpload);
