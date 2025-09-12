"use client";

import {ReactNode, createContext, useContext, useRef} from "react";

type MediaContextType = {
  registerRefetchFunction: (id: string, refetchFn: () => void) => void;
  unregisterRefetchFunction: (id: string) => void;
  triggerRefetchAll: () => void;
};

const MediaContext = createContext<MediaContextType | null>(null);

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error("useMediaContext must be used within a MediaProvider");
  }
  return context;
};

type MediaProviderProps = {
  children: ReactNode;
};

export const MediaProvider = ({children}: MediaProviderProps) => {
  const refetchFunctionsRef = useRef<Map<string, () => void>>(new Map());

  const registerRefetchFunction = (id: string, refetchFn: () => void) => {
    refetchFunctionsRef.current.set(id, refetchFn);
  };

  const unregisterRefetchFunction = (id: string) => {
    refetchFunctionsRef.current.delete(id);
  };

  const triggerRefetchAll = () => {
    refetchFunctionsRef.current.forEach(refetchFn => {
      try {
        refetchFn();
      } catch (error) {
        console.error("Error triggering refetch:", error);
      }
    });
  };

  return (
    <MediaContext.Provider
      value={{
        registerRefetchFunction,
        unregisterRefetchFunction,
        triggerRefetchAll,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
