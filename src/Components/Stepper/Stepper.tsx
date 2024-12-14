import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { IProjectData } from "../../Types/project.ts";

import StepOne from "./Components/Steps/StepOne.tsx";
import StepTwo from "./Components/Steps/StepTwo.tsx";
import StepThree from "./Components/Steps/StepThree.tsx";
import StepFour from "./Components/Steps/StepFour.tsx";

import {
  NavigationButtons,
  ScreenReaderOnly,
  WizardWrapper,
} from "./Stepper.style.ts";

interface IStepperProps {
  setProjectCreatedSuccessfully: Dispatch<SetStateAction<boolean>>;
  formData: IProjectData;
  setFormData: Dispatch<SetStateAction<IProjectData>>;
}

interface IStepperProps {
  setProjectCreatedSuccessfully: Dispatch<SetStateAction<boolean>>;
  formData: IProjectData;
  setFormData: Dispatch<SetStateAction<IProjectData>>;
}

const Stepper = ({
  setProjectCreatedSuccessfully,
  formData,
  setFormData,
}: IStepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleChange = <K extends keyof IProjectData>(
    key: K,
    value: IProjectData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting data:", formData);
    // Simulate fake API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProjectCreatedSuccessfully(true);
  };

  const steps = [
    <StepOne formData={formData} handleChange={handleChange} />,
    <StepTwo formData={formData} handleChange={handleChange} />,
    <StepThree formData={formData} handleChange={handleChange} />,
    <StepFour formData={formData} />,
  ];

  const isLastStep = currentStep === steps.length;

  const variants = {
    enter: { opacity: 0, x: 0 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  return (
    <WizardWrapper>
      <ScreenReaderOnly>
        <p aria-live="polite">Current step: {steps[currentStep - 1]}</p>
      </ScreenReaderOnly>
      <AnimatePresence mode={"wait"}>
        <motion.div
          key={currentStep}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
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
