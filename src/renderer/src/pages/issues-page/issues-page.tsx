import { Table } from "@mantine/core";
import { FC } from "react";

import { PageLayout } from "@renderer/widgets/page-layout";

const issues = [
  {
    assignee: "Alice",
    id: "KW-1",
    priority: "High",
    status: "Open",
    title: "UI Bug: Button alignment is off on the login screen",
  },
  {
    assignee: "Bob",
    id: "KW-2",
    priority: "Medium",
    status: "In Progress",
    title: "Feature: Implement dark mode theme",
  },
  {
    assignee: "Alice",
    id: "KW-3",
    priority: "High",
    status: "In Review",
    title: "Refactor: Optimize database query for user profiles",
  },
  {
    assignee: "Charlie",
    id: "KW-4",
    priority: "Low",
    status: "Done",
    title: "Docs: Update API documentation for the new endpoint",
  },
  {
    assignee: "Bob",
    id: "KW-5",
    priority: "Critical",
    status: "In Progress",
    title: "Performance: Investigate slow loading times on the dashboard",
  },
  {
    assignee: "",
    id: "KW-6",
    priority: "Medium",
    status: "Backlog",
    title: "Feature: Add support for social media logins (Google, GitHub)",
  },
  {
    assignee: "",
    id: "KW-7",
    priority: "High",
    status: "Open",
    title: "Bug: Application crashes when uploading a file larger than 10MB",
  },
  {
    assignee: "Charlie",
    id: "KW-8",
    priority: "Medium",
    status: "In Progress",
    title: "Tests: Increase test coverage for the payments module",
  },
  {
    assignee: "Alice",
    id: "KW-9",
    priority: "Low",
    status: "Done",
    title: "Chore: Upgrade Node.js to the latest LTS version",
  },
  {
    assignee: "",
    id: "KW-10",
    priority: "High",
    status: "Backlog",
    title: "Feature: Build a new reporting and analytics page",
  },
  {
    assignee: "Bob",
    id: "KW-11",
    priority: "Medium",
    status: "In Progress",
    title: "UI/UX: Redesign the main navigation menu for better usability",
  },
  {
    assignee: "Charlie",
    id: "KW-12",
    priority: "Critical",
    status: "Open",
    title: "Bug: Incorrect data displayed on the weekly summary report",
  },
  {
    assignee: "",
    id: "KW-13",
    priority: "High",
    status: "Backlog",
    title: "Refactor: Switch from REST API to GraphQL for issue data",
  },
  {
    assignee: "Alice",
    id: "KW-14",
    priority: "Critical",
    status: "In Progress",
    title: "Security: Implement two-factor authentication (2FA)",
  },
  {
    assignee: "",
    id: "KW-15",
    priority: "Low",
    status: "Open",
    title: "Chore: Clean up unused CSS styles and assets",
  },
];

export const IssuesPage: FC = () => {
  const rows = [...issues, ...issues].map((issue) => (
    <Table.Tr key={issue.id}>
      <Table.Td>{issue.id}</Table.Td>
      <Table.Td>{issue.title}</Table.Td>
      <Table.Td>{issue.status}</Table.Td>
      <Table.Td>{issue.priority}</Table.Td>
      <Table.Td>{issue.assignee}</Table.Td>
    </Table.Tr>
  ));

  return (
    <PageLayout>
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Priority</Table.Th>
            <Table.Th>Assignee</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </PageLayout>
  );
};
