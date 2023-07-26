import { ThemeContext } from "@emotion/react";
import React, { useContext, useState } from "react";

const GlobalStateContext = React.createContext();
const GlobalStateUpdateContext = React.createContext();

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function useGlobalStateUpdate() {
  return useContext(GlobalStateUpdateContext);
}

export function GlobalStateProvider({ children }) {
  const [global, setGlobal] = useState({});
  return (
    <GlobalStateContext.Provider>
      <GlobalStateUpdateContext.Provider>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
}
