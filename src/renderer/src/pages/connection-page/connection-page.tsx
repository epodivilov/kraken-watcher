import { Center } from "@mantine/core";
import { FC } from "react";

import { PageLayout } from "@renderer/widgets/page-layout";
import { AddConnectionForm } from "@renderer/features/add-connection";

export const ConnectionPage: FC = () => {
  return (
    <PageLayout>
      <Center style={{ height: "100%" }}>
        <AddConnectionForm />
      </Center>
    </PageLayout>
  );
};
