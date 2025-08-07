import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { useAtomValue } from "jotai";
import { Provider } from "jotai";
import { FC } from "react";

import { connectionStatusAtom } from "@renderer/entities/connection";
import { ConnectionPage } from "@renderer/pages/connection-page";
import { IssuesPage } from "@renderer/pages/issues-page";

import { theme } from "./theme";

const AppContent: FC = () => {
  const isConnected = useAtomValue(connectionStatusAtom);
  return isConnected ? <IssuesPage /> : <ConnectionPage />;
};

const App: FC = () => (
  <MantineProvider theme={theme}>
    <Provider>
      <AppContent />
    </Provider>
  </MantineProvider>
);

export default App;
