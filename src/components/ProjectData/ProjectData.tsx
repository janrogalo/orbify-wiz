import { Dispatch, SetStateAction } from "react";
import { IProjectData } from "@types/project.ts";

interface IProjectDataProps {
  setProjectCreatedSuccessfully: Dispatch<SetStateAction<boolean>>;
  resetFormData: () => void;
  formData: IProjectData;
}

function ProjectData({
  setProjectCreatedSuccessfully,
  resetFormData,
  formData,
}: IProjectDataProps) {
  const handleCreateNewProject = () => {
    resetFormData();
    setProjectCreatedSuccessfully(false);
  };

  return (
    <div>
      <h2>{JSON.stringify(formData)}</h2>
      <button onClick={handleCreateNewProject}>Create New Project</button>
    </div>
  );
}

export default ProjectData;
