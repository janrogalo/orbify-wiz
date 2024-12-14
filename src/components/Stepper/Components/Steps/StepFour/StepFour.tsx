import { useEffect } from "react";
import {IStepProps} from "../../../../../types/project.ts";

import {
  Container,
  ErrorSummary,
  ErrorText,
  Field,
  Label,
  ReviewList,
  Title,
  Value,
} from "./StepFour.style.ts";

const StepFour = ({ formData, setErrors, errors }: IStepProps) => {
  useEffect(() => {
    if (errors && setErrors && Object.keys(errors).length > 0) {
      setErrors({});
    }
  }, []);

  return (
    <Container>
      <Title>Step 4: Review & Submit</Title>

      {errors && Object.keys(errors).length > 0 ? (
        <ErrorSummary>
          <strong>Please fix the following issues:</strong>
          <ul>
            {errors &&
              Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
          </ul>
        </ErrorSummary>
      ) : null}

      <ReviewList>
        <Field>
          <Label>Project Name:</Label> <Value>{formData.name}</Value>
          {errors?.name && <ErrorText>{errors.name}</ErrorText>}
        </Field>

        <Field>
          <Label>Description:</Label> <Value>{formData.description}</Value>
        </Field>

        <Field>
          <Label>StartDate:</Label> <Value>{formData.startDate}</Value>
          {errors?.dateRange && <ErrorText>{errors.dateRange}</ErrorText>}
        </Field>
        <Field>
          <Label>EndDate:</Label> <Value>{formData.endDate}</Value>
          {errors?.dateRange && <ErrorText>{errors.dateRange}</ErrorText>}
        </Field>

        <Field>
          <Label>GeoJSON File:</Label>{" "}
          <Value>{formData.geoJsonFile?.name}</Value>
          {errors?.geoJsonFile && <ErrorText>{errors.geoJsonFile}</ErrorText>}
        </Field>
      </ReviewList>
    </Container>
  );
};

export default StepFour;
