"use client";

import { NavKey } from "@/common/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

interface NavigationContext {
  currentPage: NavKey;
  navigateTo: (page: NavKey) => void;
}

const context = createContext<NavigationContext>({
  currentPage: "inbox",
  navigateTo: () => {},
});

export function useNavigation() {
  return useContext(context);
}

export default function NavigationProvider({ children }: PropsWithChildren) {
  const [currentPage, setCurrentPage] = useState<NavKey>("inbox");

  const navigateTo = useCallback((page: NavKey) => {
    setCurrentPage(page);
  }, []);

  return (
    <context.Provider value={{ currentPage, navigateTo }}>
      {children}
    </context.Provider>
  );
}
