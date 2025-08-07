import { Button, Stack, TextInput, Alert, Space } from "@mantine/core";
import { useSetAtom } from "jotai";
import { FC, useState, useRef } from "react";

import { addConnectionAtom } from "@renderer/entities/connection";

interface AddConnectionFormProps {
  onSuccess?: () => void;
}

export const AddConnectionForm: FC<AddConnectionFormProps> = ({ onSuccess }) => {
  const addConnection = useSetAtom(addConnectionAtom);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const repoPath = formData.get('repoPath') as string;
    const token = formData.get('token') as string;

    const parts = repoPath.split("/").filter(Boolean);
    if (parts.length !== 2) {
      setError('Invalid repository format. Please use "owner/repo".');
      return;
    }

    const [owner, repo] = parts;
    addConnection({ owner, repo, token });

    formRef.current?.reset();
    onSuccess?.();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 500 }}>
      <Stack>
        <TextInput
          name="repoPath"
          label="Repository"
          placeholder="e.g., epodivilov/kraken-watcher"
          onInput={() => setError(null)}
          error={error}
          data-autofocus
          required
        />
        <TextInput
          name="token"
          label="PAT (optional)"
          placeholder="Personal Access Token"
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
