import React, { createContext, useContext, useState } from "react";

const SelectedBetsContext = createContext();

export function SelectedBetsProvider({ children }) {
  const [selectedBets, setSelectedBets] = useState([]);

  return (
    <SelectedBetsContext.Provider value={{ selectedBets, setSelectedBets }}>{children}</SelectedBetsContext.Provider>
  );
}

export function useSelectedBetsContext() {
  return useContext(SelectedBetsContext);
}
