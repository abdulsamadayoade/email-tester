"use client";
import { createContext, useState, useContext } from "react";

type AppContextType = {
  html: string;
  updateHtml: (html: string) => void;
};

const AppContext = createContext<AppContextType>({
  html: "",
  updateHtml: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState({
    html: "",
  });

  const updateHtml = (html: string) => setData({ ...data, html });

  return (
    <AppContext.Provider
      value={{
        ...data,
        updateHtml,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
