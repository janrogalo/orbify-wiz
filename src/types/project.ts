import { Dispatch, SetStateAction } from "react";

export interface IProjectData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  geoJsonFile: Blob | null;
}

export interface IStepProps {
  formData: IProjectData;
  errors?: Record<string, string>;
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
  handleChange?: <K extends keyof IProjectData>(
    key: K,
    value: IProjectData[K],
  ) => void;
}
