import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 24px;
`;

export const ErrorSummary = styled.div`
  background-color: #ffe6e6;
  color: #d32f2f;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #d32f2f;
`;

export const Field = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.5;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

export const Value = styled.span`
  color: #333;
`;

export const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 14px;
  margin-left: 8px;
`;

export const ReviewList = styled.div`
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;
