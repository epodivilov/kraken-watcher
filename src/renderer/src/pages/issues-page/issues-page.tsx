import { Anchor, Badge, Box, Center, Group, Loader, Paper, ScrollArea, Table, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { FC } from "react";

import { issuesAtom } from "@renderer/entities/issue";
import { PageLayout } from "@renderer/widgets/page-layout";

import classes from "./issues-page.module.css";

export const IssuesPage: FC = () => {
  const [issuesLoadable] = useAtom(issuesAtom);

  if (issuesLoadable.state === "loading") {
    return (
      <PageLayout>
        <Box className={classes.centered}>
          <Loader />
        </Box>
      </PageLayout>
    );
  }

  if (issuesLoadable.state === "hasError") {
    return (
      <PageLayout>
        <Paper className={classes.centered} withBorder p="lg">
          <Text c="red" ta="center">
            Error: {(issuesLoadable.error as any).message}
          </Text>
        </Paper>
      </PageLayout>
    );
  }

  if (issuesLoadable.data.length === 0) {
    return (
      <PageLayout>
        <Center h="100%">
          <Text>No issues found.</Text>
        </Center>
      </PageLayout>
    );
  }

  const rows = issuesLoadable.data.map((issue) => (
    <Table.Tr key={issue.id}>
      <Table.Td>
        <Anchor href={issue.html_url} target="_blank">
          {issue.number}
        </Anchor>
      </Table.Td>
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>
        <Badge color={issue.state === "open" ? "green" : "red"}>{issue.state}</Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {issue.labels.map((label) => (
            <Badge key={label.name} color={`#${label.color}`}>
              {label.name}
            </Badge>
          ))}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <PageLayout>
      <ScrollArea h="100%">
        <Table stickyHeader stickyHeaderOffset={0}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Labels</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </PageLayout>
  );
};

