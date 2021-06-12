import { createContext, useContext } from "react";
import { AppState } from "@src/types";
export const StateContext = createContext(null);

const useAppState = (initialData: AppState) => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return { ...initialData, ...context };
};

export default useAppState;
