import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { useAtomValue } from "jotai";
import { Provider } from "jotai";
import { FC } from "react";

import { connectionsAtom } from "@renderer/entities/connection";
import { ConnectionPage } from "@renderer/pages/connection-page";
import { IssuesPage } from "@renderer/pages/issues-page";

import { theme } from "./theme";

const AppContent: FC = () => {
  const connections = useAtomValue(connectionsAtom);

  if (connections.length === 0) {
    return <ConnectionPage />;
  }

  return <IssuesPage />;
};

const App: FC = () => (
  <MantineProvider theme={theme}>
    <Provider>
      <AppContent />
    </Provider>
  </MantineProvider>
);

export default App;
