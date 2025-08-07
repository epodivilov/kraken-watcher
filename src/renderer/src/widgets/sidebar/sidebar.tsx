import { ActionIcon, AppShell, Group, Image, Modal, NavLink, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAtom, useSetAtom } from "jotai";
import { FC, useCallback } from "react";

import icon from "@renderer/assets/icon.webp";
import {
  Connection,
  activeConnectionIdAtom,
  connectionsAtom,
  removeConnectionAtom,
} from "@renderer/entities/connection";
import { AddConnectionForm } from "@renderer/features/add-connection";

interface RepoLinkProps {
  connection: Connection;
  isActive: boolean;
  onClick: () => void;
  onRemove: () => void;
}

const RepoLink: FC<RepoLinkProps> = ({ connection, isActive, onClick, onRemove }) => (
  <NavLink
    tabIndex={0}
    key={connection.id}
    label={connection.repo}
    description={connection.owner}
    active={isActive}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
    rightSection={
      <ActionIcon
        size="sm"
        variant="light"
        color="red"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <IconTrash size="0.8rem" />
      </ActionIcon>
    }
  />
);

interface SidebarProps {
  opened: boolean;
  toggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ opened, toggle }) => {
  const [connections] = useAtom(connectionsAtom);
  const [activeConnectionId, setActiveConnectionId] = useAtom(activeConnectionIdAtom);
  const removeConnection = useSetAtom(removeConnectionAtom);

  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const handleConnectionClick = useCallback(
    (id: string) => {
      setActiveConnectionId(id);
    },
    [setActiveConnectionId],
  );

  return (
    <>
      <AppShell.Header>
        <Group h="100%" px="md">
          <ActionIcon
            onClick={toggle}
            variant="transparent"
            size="lg"
            aria-label="Toggle sidebar"
            aria-keyshortcuts="ctrl+b"
          >
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
            <ActionIcon size="sm" variant="subtle" onClick={openModal} aria-keyshortcuts="ctrl+n">
              <IconPlus />
            </ActionIcon>
          </Group>

          {connections.map((conn) => (
            <RepoLink
              key={conn.id}
              connection={conn}
              isActive={activeConnectionId === conn.id}
              onClick={() => handleConnectionClick(conn.id)}
              onRemove={() => removeConnection(conn.id)}
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
