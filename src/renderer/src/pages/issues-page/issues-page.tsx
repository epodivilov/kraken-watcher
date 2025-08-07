import { Anchor, Badge, Box, Button, Center, Group, Loader, Paper, ScrollArea, Table, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { FC } from "react";

import { issuesAtom, issuesPageAtom } from "@renderer/entities/issue";
import { PageLayout } from "@renderer/widgets/page-layout";

import classes from "./issues-page.module.css";

export const IssuesPage: FC = () => {
  const [issuesLoadable] = useAtom(issuesAtom);
  const [page, setPage] = useAtom(issuesPageAtom);

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

  if (issuesLoadable.data.issues.length === 0) {
    return (
      <PageLayout>
        <Center h="100%">
          <Text>No issues found.</Text>
        </Center>
      </PageLayout>
    );
  }

  const { issues, hasNextPage } = issuesLoadable.data;

  const rows = issues.map((issue) => (
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
      <ScrollArea h="calc(100% - 60px)">
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
      <Group justify="center" pt="md">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
          Next
        </Button>
      </Group>
    </PageLayout>
  );
};
