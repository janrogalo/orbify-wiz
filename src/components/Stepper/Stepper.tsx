import {Dispatch, SetStateAction, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

import {IProjectData} from "../../types/project.ts";
import {MOTION_VARIANTS} from "../../types/constants.ts";

import {validateForm} from "../../utils/validateForm.ts";
import {StepOne, StepTwo, StepThree, StepFour} from "../Stepper/Components/Steps/index.ts";
import {NavigationButtons, ScreenReaderOnly, WizardWrapper} from "./Stepper.style.ts";
import {isValidGeoJSON} from "../../utils/isValidGeoJSON.ts";
import {readFileAsText} from "../../utils/readfFileAsText.ts";


interface IStepperProps {
    setProjectCreatedSuccessfully: Dispatch<SetStateAction<boolean>>;
    formData: IProjectData;
    setFormData: Dispatch<SetStateAction<IProjectData>>;
    setUploadedGeoJson: Dispatch<SetStateAction<any | null>>;
}

const Stepper = ({
                     setProjectCreatedSuccessfully,
                     formData,
                     setFormData,
                     setUploadedGeoJson
                 }: IStepperProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const handleChange = <K extends keyof IProjectData>(
        key: K,
        value: IProjectData[K],
    ) => {
        setFormData((prev) => ({...prev, [key]: value}));
    };

    const handleSubmit = async () => {
        // Simulate a delay for submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Validate the form fields
        const formErrors = await validateForm(formData);

        // Validate the GeoJSON file
        if (formData.geoJsonFile) {
            try {
                const geoJsonText = await readFileAsText(formData.geoJsonFile);
                const geoJsonData = JSON.parse(geoJsonText);

                if (!isValidGeoJSON(geoJsonData)) {
                    formErrors.geoJsonFile = "Invalid GeoJSON file structure.";
                } else {
                    setUploadedGeoJson(geoJsonData); // Save valid GeoJSON data
                }
            } catch (error) {
                formErrors.geoJsonFile = "Error reading or parsing GeoJSON file.";
            }
        } else {
            formErrors.geoJsonFile = "GeoJSON file is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setProjectCreatedSuccessfully(true);
        }
    };

    const steps = [
        <StepOne key="step-one" formData={formData} handleChange={handleChange}/>,
        <StepTwo key="step-two" formData={formData} handleChange={handleChange}/>,
        <StepThree
            key="step-three"
            formData={formData}
            handleChange={handleChange}
        />,
        <StepFour
            key="step-four"
            formData={formData}
            setErrors={setErrors}
            errors={errors}
        />,
    ];

    const isLastStep = currentStep === steps.length;

    return (
        <WizardWrapper>
            <ScreenReaderOnly>
                <p aria-live="polite">Current step: {steps[currentStep - 1]}</p>
            </ScreenReaderOnly>
            <AnimatePresence mode={"wait"}>
                <motion.div
                    key={currentStep}
                    variants={MOTION_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{duration: 0.5}}
                >
                    {steps[currentStep - 1]}
                </motion.div>
            </AnimatePresence>

            <NavigationButtons>
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    aria-label="Go to previous step"
                >
                    Back
                </button>
                <button
                    onClick={isLastStep ? handleSubmit : nextStep}
                    aria-label={isLastStep ? "Submit" : "Go to next step"}
                >
                    {isLastStep ? "Submit" : "Next"}
                </button>
            </NavigationButtons>
        </WizardWrapper>
    );
};

export default Stepper;
