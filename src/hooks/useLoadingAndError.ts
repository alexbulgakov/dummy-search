import { useContext } from "react";
import { LoadingAndErrorContext } from "../context/LoadingAndErrorContext/LoadingAndErrorContext";

export const useLoadingAndError = () => {
  const context = useContext(LoadingAndErrorContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingAndError must be used within a LoadingAndErrorProvider"
    );
  }
  return context;
};
