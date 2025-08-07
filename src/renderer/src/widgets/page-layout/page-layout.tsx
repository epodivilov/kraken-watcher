import { AppShell } from "@mantine/core";
import { useAtom } from "jotai";
import { FC, PropsWithChildren } from "react";

import { Sidebar } from "@renderer/widgets/sidebar";

import { sidebarOpenedAtom, useSidebarResizeEffect } from "./page-layout.model";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const [opened, setOpened] = useAtom(sidebarOpenedAtom);
  const toggle = (): void => setOpened(!opened);

  useSidebarResizeEffect();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <Sidebar opened={opened} toggle={toggle} />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
