import { IStepProps } from "../../../../Types/project.ts";

const StepTwo = ({ formData, handleChange }: IStepProps) => {
  return (
    <div>
      <h2>Step 2: Date Range</h2>
      <label>
        Start Date:
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            handleChange && handleChange("startDate", e.target.value)
          }
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            handleChange && handleChange("endDate", e.target.value)
          }
        />
      </label>
    </div>
  );
};

export default StepTwo;
