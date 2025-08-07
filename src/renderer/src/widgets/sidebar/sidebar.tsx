import { ActionIcon, AppShell, Group, Image, Title } from "@mantine/core";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { FC } from "react";

import icon from "@renderer/assets/icon.webp";

interface SidebarProps {
  opened: boolean;
  toggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ opened, toggle }) => (
  <>
    <AppShell.Header>
      <Group h="100%" px="md">
        <ActionIcon onClick={toggle} variant="transparent" size="lg" aria-label="Toggle sidebar">
          {opened ? <IconLayoutSidebarLeftCollapse stroke={1.5} /> : <IconLayoutSidebarLeftExpand stroke={1.5} />}
        </ActionIcon>
        <Image src={icon} h={30} w={30} alt="Kraken Watcher Logo" />
        <Title order={3}>Kraken Watcher</Title>
      </Group>
    </AppShell.Header>

    <AppShell.Navbar p="md">
      <div>Sidebar content</div>
    </AppShell.Navbar>
  </>
);
