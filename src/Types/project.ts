export interface IProjectData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  geoJsonFile: JSON | null;
}

export interface IStepProps {
  formData: IProjectData;
  handleChange?: <K extends keyof IProjectData>(
    key: K,
    value: IProjectData[K],
  ) => void;
}
