import { StepWrapper } from "./StepOne.style.ts";
import { IStepProps } from "../../../../Types/project.ts";

const StepOne = ({ formData, handleChange }: IStepProps) => {
  return (
    <StepWrapper>
      <h2>Step 1: Basic Information</h2>
      <label htmlFor="project-name">Project Name (required):</label>
      <input
        id="project-name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange && handleChange("name", e.target.value)}
        maxLength={32}
        placeholder="Enter project name"
        aria-required="true"
      />
      <label htmlFor="project-description">Description (optional):</label>
      <textarea
        id="project-description"
        value={formData.description}
        onChange={(e) =>
          handleChange && handleChange("description", e.target.value)
        }
        placeholder="Enter project description"
      />
    </StepWrapper>
  );
};

export default StepOne;
