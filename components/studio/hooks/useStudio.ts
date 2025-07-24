import { useContext } from "react";
import { StudioContext } from "../StudioProvider";

/**
 * Main hook to access studio context
 */
export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
