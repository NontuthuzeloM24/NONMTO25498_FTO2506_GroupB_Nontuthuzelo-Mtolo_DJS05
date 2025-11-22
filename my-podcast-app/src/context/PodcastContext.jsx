import React, { createContext, useContext } from "react";

const PodcastContext = createContext();

export function PodcastContextProvider({ children }) {
  return (
    <PodcastContext.Provider value={{}}>
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcastContext() {
  return useContext(PodcastContext);
}
