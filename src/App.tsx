import Stepper from "./components/Stepper/Stepper.tsx";
import styled from "styled-components";
import { useState } from "react";
import ProjectData from "./components/ProjectData/ProjectData.tsx";
import { IProjectData } from "./types/project.ts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [projectCreatedSuccessfully, setProjectCreatedSuccessfully] =
    useState(false);
  const [uploadedGeoJson, setUploadedGeoJson] = useState<any | null>(null);

  const [formData, setFormData] = useState<IProjectData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    geoJsonFile: null,
  });

  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      geoJsonFile: null,
    });
  };

  return (
    <Wrapper>
      <h1>Project Wizard</h1>

      {projectCreatedSuccessfully ? (
        <ProjectData
          setProjectCreatedSuccessfully={setProjectCreatedSuccessfully}
          resetFormData={resetFormData}
          formData={formData}
          uploadedGeoJson={uploadedGeoJson}
        />
      ) : (
        <Stepper
          setProjectCreatedSuccessfully={setProjectCreatedSuccessfully}
          formData={formData}
          setFormData={setFormData}
          setUploadedGeoJson={setUploadedGeoJson}

        />
      )}
    </Wrapper>
  );
}

export default App;
