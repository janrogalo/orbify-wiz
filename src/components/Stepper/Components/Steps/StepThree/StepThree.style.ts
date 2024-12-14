import styled from "styled-components";
import { motion } from "framer-motion";

export const DropZone = styled(motion.div)`
  border: 2px dashed #007bff;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    background: #f0f8ff;
  }
`;

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

export const FileInfo = styled.div`
  margin-top: 20px;
  color: green;
`;
