"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IList } from "../components/template";
import { ToastContainer } from "react-toastify";

interface IContext {
  search: string;

  setState: Dispatch<SetStateAction<string>>;

  filter: (temp: IList[]) => IList[];
}

export const Context = createContext<IContext>({} as IContext);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");

  const initContext: IContext = {
    search: search,

    setState: (text) => setSearch(text),
    filter: (temp: IList[]) => {
      return search === ""
        ? temp
        : temp.filter((e) =>
            e.name.toLowerCase().includes(search.toLowerCase())
          );
    },
  };

  return (
    <Context.Provider value={initContext}>
      {children}
      <ToastContainer />
    </Context.Provider>
  );
};

export const searchContext = () => useContext(Context);
