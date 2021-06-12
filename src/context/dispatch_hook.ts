import { createContext, useContext } from "react";

export const DispatchContext = createContext(null);

function useAppDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppMappingProvider");
  }
  return context;
}

export default useAppDispatch;
