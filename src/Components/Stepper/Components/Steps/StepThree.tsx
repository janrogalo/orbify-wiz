import React, { useRef } from "react";
import { DropZone } from "./StepThree.style.ts";
import { IStepProps } from "../../../../Types/project.ts";

const StepThree = ({ formData, handleChange }: IStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && handleChange) {
      handleChange("geoJsonFile", file);
    } else {
      alert("Please upload a valid GeoJSON file!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formData.geoJsonFile) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2>Step 3: Upload GeoJSON</h2>
      <DropZone
        tabIndex={0}
        role="button"
        aria-label="Upload a GeoJSON file"
        onClick={handleDropZoneClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        Drag and drop a GeoJSON file here, or click to upload.
      </DropZone>
      <input
        type="file"
        accept=".geojson"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default StepThree;
