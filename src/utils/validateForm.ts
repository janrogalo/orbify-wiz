import { isValidGeoJSON } from "./isValidGeoJSON.ts";
import {IProjectData} from "../types/project.ts";

export const validateForm = async (
  formData: IProjectData,
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};

  // Validate Project Name
  if (!formData.name.trim()) {
    errors.name = "Project name is required.";
  } else if (formData.name.length > 32) {
    errors.name = "Project name must be 32 characters or fewer.";
  }

  // Validate Date Range
  if (!formData.startDate || !formData.endDate) {
    errors.dateRange = "Start and end dates are required.";
  } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
    errors.dateRange = "End date must be after the start date.";
  }

  // Validate GeoJSON File
  if (!formData.geoJsonFile) {
    errors.geoJsonFile = "GeoJSON file is required.";
  } else {
    try {
      const file = formData.geoJsonFile;
      const reader = new FileReader();

      const fileValidationPromise = new Promise<void>((resolve, reject) => {
        reader.onloadend = () => {
          try {
            const geoJson = JSON.parse(reader.result as string);
            if (!isValidGeoJSON(geoJson)) {
              errors.geoJsonFile = "Invalid GeoJSON structure!";
            }
            resolve();
          } catch (error) {
            errors.geoJsonFile =
              "Error parsing the GeoJSON file. Please upload a valid file.";
            reject(error);
          }
        };

        reader.onerror = () => {
          errors.geoJsonFile = "Error reading the GeoJSON file.";
          reject(new Error("File reading error"));
        };

        reader.readAsText(file);
      });

      await fileValidationPromise;
    } catch (error) {
      console.error("GeoJSON validation error:", error);
    }
  }
  return errors;
};
