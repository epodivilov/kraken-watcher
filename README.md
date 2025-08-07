# Kraken Watcher

Kraken Watcher is a lightweight and performant desktop application for browsing open issues in public and private GitHub repositories. The application is built with Electron and React, focusing on a clean separation of concerns and a modern development stack.

## Tech Stack & Architecture

This project utilizes a modern technology stack chosen for performance, developer experience, and maintainability.

| Category             | Technology                                                       |
| -------------------- | ---------------------------------------------------------------- |
| **Platform**         | **Electron** & **Vite** (`electron-vite`)                        |
| **UI Framework**     | **React** & **Mantine UI**                                       |
| **State Management** | **Jotai**                                                        |
| **API & Caching**    | **Node.js** (`main` process), **`stale-while-revalidate-cache`** |
| **Testing**          | **Vitest** & **React Testing Library**                           |
| **Package Manager**  | **pnpm**                                                         |

## Architectural Decisions

The application's architecture is intentionally designed to leverage the full capabilities of the Electron platform, rather than treating it as a simple web wrapper.

### 1. IPC-Driven Architecture

All communication with the external GitHub API is handled exclusively by the Electron `main` process. The `renderer` (UI) process is not permitted to make direct network requests.

- **Why?**
  - **Security:** The GitHub Personal Access Token, once entered in the UI, is passed directly to the `main` process for use in API requests. It is never stored long-term in the renderer process or exposed in client-side bundles, mitigating risks of token leakage.
  - **Separation of Concerns:** The `main` process acts as a dedicated backend layer responsible for data fetching, caching, and business logic. The `renderer` process is solely responsible for presentation.
  - **Performance:** Heavy operations like API requests and caching are offloaded from the UI thread, ensuring the interface remains responsive.

### 2. Type-Safe API Contracts

Communication between the `main` and `renderer` processes is strictly typed and predictable.

- **How?**
  - **Result Type:** Instead of throwing errors over the IPC bridge (which can lead to lost context), API calls return a `Result` object: `{ ok: true, value: T }` or `{ ok: false, error: E }`. This creates an explicit and robust contract.
  - **Shared Types:** A central `src/shared` directory contains all shared TypeScript types and IPC channel constants, ensuring type safety and consistency across the entire application.

### 3. Atomic State Management

State is managed using Jotai, a modern, atomic state management library.

- **Why?**
  - **Simplicity & Scalability:** State is broken down into small, independent units (atoms). This avoids the boilerplate and complexity of monolithic state stores.
  - **Declarative Data Fetching:** Asynchronous operations are handled declaratively using the `loadable` utility from `jotai/utils`. This utility automatically manages `loading`, `data`, and `error` states, simplifying component logic significantly.

## Getting Started

### Prerequisites

- Node.js (v22 or later)
- pnpm (v10 or later)
