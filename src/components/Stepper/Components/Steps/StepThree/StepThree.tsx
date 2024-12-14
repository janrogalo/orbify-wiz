import React, { useRef, useState } from "react";
import {
  Container,
  DropZone,
  ErrorSummary,
  FileInfo,
  Title,
} from "./StepThree.style.ts";
import {IStepProps} from "@types/project.ts";
import {MAX_FILE_SIZE} from "../../../../../types/constants.ts";


const StepThree = ({ formData, handleChange }: IStepProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setFileError("");

    if (!file) {
      setFileError("No file selected!");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File is too large! Please upload a file smaller than 1MB.");
      return;
    }

    if (file.size === 0) {
      setFileError("Uploaded file is empty.");
      return;
    }

    try {
      if (handleChange) {
        handleChange("geoJsonFile", file);
      }
      setUploadedFile(file);
    } catch (error) {
      setFileError("Error reading the file. Please upload a valid file.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (handleChange) {
      handleChange("geoJsonFile", null);
    }
  };

  return (
    <Container>
      <Title>Step 3: Upload File</Title>
      <DropZone
        tabIndex={0}
        role="button"
        aria-label="Upload a file"
        onClick={handleDropZoneClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Drag and drop a file here, or click to upload.
      </DropZone>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleInputChange}
      />

      {fileError && <ErrorSummary>{fileError}</ErrorSummary>}

      {uploadedFile && (
        <FileInfo>
          <strong>File uploaded successfully!</strong>
          <p>File name: {uploadedFile.name}</p>
          <button onClick={handleRemoveFile} style={{ color: "red" }}>
            Remove File
          </button>
        </FileInfo>
      )}
    </Container>
  );
};

export default StepThree;
