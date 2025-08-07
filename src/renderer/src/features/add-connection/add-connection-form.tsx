import { Button, Stack, TextInput, Alert, Space } from "@mantine/core";
import { useSetAtom } from "jotai";
import { FC, useState } from "react";
import { nanoid } from "nanoid";

import { connectionsAtom } from "@renderer/entities/connection";

interface AddConnectionFormProps {
  onSuccess?: () => void;
}

export const AddConnectionForm: FC<AddConnectionFormProps> = ({ onSuccess }) => {
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
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 500 }}>
      <Stack>
        <TextInput
          label="Repository*"
          placeholder="e.g., epodivilov/kraken-watcher"
          value={repoPath}
          onChange={(event) => setRepoPath(event.currentTarget.value)}
          onInput={() => setError(null)}
          error={error}
          data-autofocus
          required
        />
        <TextInput
          label="PAT (optional)"
          placeholder="Personal Access Token"
          value={token}
          onChange={(event) => setToken(event.currentTarget.value)}
          onInput={() => setError(null)}
        />
        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}
        <Space h="md" />
        <Button type="submit">Add Connection</Button>
      </Stack>
    </form>
  );
};
