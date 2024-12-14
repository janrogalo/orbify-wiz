import {Dispatch, SetStateAction} from "react";
import {IProjectData} from "../../types/project.ts";
import MapProvider from "../MapProvider/MapProvider.tsx";
import {Title} from "../Stepper/Components/Steps/StepFour/StepFour.style.ts";
import {Wrapper} from "./ProjectData.style.ts";

interface IProjectDataProps {
    setProjectCreatedSuccessfully: Dispatch<SetStateAction<boolean>>;
    resetFormData: () => void;
    formData: IProjectData;
    uploadedGeoJson: any;
}

function ProjectData({
                         setProjectCreatedSuccessfully,
                         resetFormData,
                         formData,
                         uploadedGeoJson
                     }: IProjectDataProps) {
    const handleCreateNewProject = () => {
        resetFormData();
        setProjectCreatedSuccessfully(false);
    };

    return (
        <Wrapper>
            <Title>{formData.name}</Title>
            <p>{formData.description}</p>

            <MapProvider geoJsonData={uploadedGeoJson}/>
            <button onClick={handleCreateNewProject}>Create New Project</button>
        </Wrapper>
    );
}

export default ProjectData;
