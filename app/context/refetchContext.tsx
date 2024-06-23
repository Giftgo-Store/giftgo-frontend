"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface RefetchContextType {
  refetch: boolean;
  triggerRefetch: () => void;
}

const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const RefetchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refetch, setRefetch] = useState(false);

  const triggerRefetch = () => {
    setRefetch((prev) => !prev);
  };

  return (
    <RefetchContext.Provider value={{ refetch, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};

export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (context === undefined) {
    throw new Error("useRefetch must be used within a RefetchProvider");
  }
  return context;
};
