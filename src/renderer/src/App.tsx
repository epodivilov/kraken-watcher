import { AppShell, Group, Image, Title, Table, ScrollArea, Badge } from '@mantine/core';
import icon from './assets/icon.webp';

const mockIssues = [
  {
    id: 1,
    title: 'Feat: Add dark mode toggle',
    repo: 'kraken-watcher',
    status: 'In Progress',
    assignee: 'epodivilov'
  },
  {
    id: 2,
    title: 'Fix: API rate limit errors',
    repo: 'kraken-watcher',
    status: 'Open',
    assignee: ''
  },
  {
    id: 3,
    title: 'Docs: Update README with setup instructions',
    repo: 'kraken-watcher',
    status: 'Done',
    assignee: 'epodivilov'
  },
  {
    id: 4,
    title: 'Refactor: Service layer for better testability',
    repo: 'kraken-watcher',
    status: 'Open',
    assignee: ''
  }
];

function App(): React.JSX.Element {
  const rows = mockIssues.map((issue) => (
    <Table.Tr key={issue.id}>
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.repo}</Table.Td>
      <Table.Td>
        <Badge
          color={
            issue.status === 'Done' ? 'green' : issue.status === 'In Progress' ? 'blue' : 'gray'
          }
        >
          {issue.status}
        </Badge>
      </Table.Td>
      <Table.Td>{issue.assignee || 'Unassigned'}</Table.Td>
    </Table.Tr>
  ));

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Image src={icon} h={30} w={30} alt="Kraken Watcher Logo" />
          <Title order={3}>Kraken Watcher</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <ScrollArea>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Issue</Table.Th>
                <Table.Th>Repository</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Assignee</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
