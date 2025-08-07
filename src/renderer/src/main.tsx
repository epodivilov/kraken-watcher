import './assets/main.css';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Provider } from 'jotai';
import {
  focusGroupPolyfill,
  focusGroupKeyUX,
  hiddenKeyUX,
  hotkeyKeyUX,
  hotkeyMacCompat,
  jumpKeyUX,
  pressKeyUX,
  startKeyUX,
} from "keyux";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { store } from './store';

startKeyUX(window, [
  hotkeyKeyUX([hotkeyMacCompat()]),
  pressKeyUX("is-pressed"),
  focusGroupKeyUX(),
  focusGroupPolyfill(),
  jumpKeyUX(),
  hiddenKeyUX(),
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
);
