import { AppShell } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import { FC, PropsWithChildren } from "react";

import { Sidebar } from "@renderer/widgets/sidebar";

import { sidebarOpenedAtom, useSidebarResizeEffect } from "./page-layout.model";
import { hasConnectionsAtom } from "@renderer/entities/connection/connection.model";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const hasConnections = useAtomValue(hasConnectionsAtom);
  const [opened, setOpened] = useAtom(sidebarOpenedAtom);
  const toggle = (): void => setOpened(!opened);

  useSidebarResizeEffect();

  const sidebarState = hasConnections ? opened : false;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !sidebarState, desktop: !sidebarState },
      }}
      padding="md"
    >
      <Sidebar opened={sidebarState} toggle={toggle} />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
