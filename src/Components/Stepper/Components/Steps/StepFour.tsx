import React from "react";
import { IStepProps } from "../../../../Types/project.ts";

const StepFour = ({ formData }: IStepProps) => {
  return (
    <div>
      <h2>Step 4: Review & Submit</h2>
      <p>
        <strong>Project Name:</strong> {formData.name}
      </p>
      <p>
        <strong>Description:</strong> {formData.description}
      </p>
      <p>
        <strong>Date Range:</strong> {formData.startDate} - {formData.endDate}
      </p>
      <p>
        <strong>GeoJSON File:</strong> {formData.geoJsonFile?.name}
      </p>
    </div>
  );
};

export default StepFour;
