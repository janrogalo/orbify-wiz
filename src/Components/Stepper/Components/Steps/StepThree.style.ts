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
