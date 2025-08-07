import { ActionIcon, AppShell, Group, Image, Modal, NavLink, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { FC } from "react";

import { connectionsAtom } from "@renderer/entities/connection";
import { AddConnectionForm } from "@renderer/features/add-connection";
import icon from "@renderer/assets/icon.webp";

interface SidebarProps {
  opened: boolean;
  toggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ opened, toggle }) => {
  const [connections, setConnections] = useAtom(connectionsAtom);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const handleRemoveConnection = (id: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== id));
  };

  return (
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
        <Stack>
          <Group justify="space-between">
            <Text size="xs" fw={500} c="dimmed">
              Connections
            </Text>
            <ActionIcon size="sm" variant="subtle" onClick={openModal}>
              <IconPlus />
            </ActionIcon>
          </Group>
          {connections.map((conn) => (
            <NavLink
              key={conn.id}
              label={`${conn.owner}/${conn.repo}`}
              active
              rightSection={
                <ActionIcon
                  size="sm"
                  variant="light"
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveConnection(conn.id);
                  }}
                >
                  <IconTrash size="0.8rem" />
                </ActionIcon>
              }
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <Modal opened={modalOpened} onClose={closeModal} title="New Connection" centered>
        <AddConnectionForm onSuccess={closeModal} />
      </Modal>
    </>
  );
};
