'use client'
import { createContext, useState } from "react";

const ALERT_TIME = 3000;
const initialState = {
  text: "",
  type: "",
};

export const AlertContext = createContext({
  ...initialState,
  setAlert: (text?: string, type?: string) => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const setAlert = (text?: string, type?: string) => {
    text && setText(text);
    type && setType(type);

    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
