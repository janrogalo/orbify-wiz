import styled from "styled-components";

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 360px;
  gap: 20px;
  padding: 16px;

  label {
    font-weight: bold;
  }

  input,
  textarea {
    width: 95%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 4px #007bff;
    }
  }
`;
