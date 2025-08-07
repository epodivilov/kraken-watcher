import { Button, Center, Stack, TextInput } from "@mantine/core";
import { useSetAtom } from "jotai";
import { FC } from "react";

import { isConnectedAtom } from "@renderer/entities/connection";
import { PageLayout } from '@renderer/widgets/page-layout'

export const ConnectionPage: FC = () => {
  const setIsConnected = useSetAtom(isConnectedAtom);

  return (
    <PageLayout>
      <Center style={{ height: "100%" }}>
        <Stack>
          <TextInput label="Repository Name" placeholder="e.g., mantinedev/mantine" />
          <TextInput label="PAT (optional)" placeholder="Personal Access Token" />
          <Button onClick={() => setIsConnected(true)}>Connect</Button>
        </Stack>
      </Center>
    </PageLayout>
  );
};
