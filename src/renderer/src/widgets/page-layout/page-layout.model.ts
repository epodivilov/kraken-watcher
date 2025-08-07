import { useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

const getInitialSidebarState = (): boolean => {
  if (typeof window === "undefined") {
    return true;
  }
  return window.matchMedia("(min-width: 48em)").matches;
};

export const sidebarOpenedAtom = atomWithStorage<boolean>("sidebar-opened", getInitialSidebarState(), undefined, {
  getOnInit: true,
});

export const useSidebarResizeEffect = (): void => {
  const setOpened = useSetAtom(sidebarOpenedAtom);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48em)");

    const handleChange = (event: MediaQueryListEvent): void => {
      setOpened(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setOpened]);
};
