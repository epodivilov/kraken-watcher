import { Button, Center, Stack, TextInput, Alert } from "@mantine/core";
import { useSetAtom } from "jotai";
import { FC, useState } from "react";
import { nanoid } from "nanoid";

import { connectionsAtom } from "@renderer/entities/connection";
import { PageLayout } from "@renderer/widgets/page-layout";

export const ConnectionPage: FC = () => {
  const setConnections = useSetAtom(connectionsAtom);
  const [repoPath, setRepoPath] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parts = repoPath.split("/").filter(Boolean);
    if (parts.length !== 2) {
      setError('Invalid repository format. Please use "owner/repo".');
      return;
    }

    const [owner, repo] = parts;
    setConnections((prev) => [...prev, { id: nanoid(), owner, repo, token }]);
    setRepoPath("");
    setToken("");
  };

  return (
    <PageLayout>
      <Center style={{ height: "100%" }}>
        <form onSubmit={handleSubmit} style={{ width: 300 }}>
          <Stack>
            <TextInput
              label="Repository"
              placeholder="e.g., mantinedev/mantine"
              value={repoPath}
              onChange={(event) => setRepoPath(event.currentTarget.value)}
              error={error}
            />
            <TextInput
              label="PAT (optional)"
              placeholder="Personal Access Token"
              value={token}
              onChange={(event) => setToken(event.currentTarget.value)}
            />
            {error && (
              <Alert color="red" title="Error">
                {error}
              </Alert>
            )}
            <Button type="submit">Add Connection</Button>
          </Stack>
        </form>
      </Center>
    </PageLayout>
  );
};
