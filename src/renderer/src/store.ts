/**
 * @file This file creates and exports the central Jotai store for the renderer process.
 * Using a central store allows for state management outside of the React component tree,
 * enabling better separation of concerns.
 *
 * @module renderer/store
 */

import { createStore } from 'jotai';

/**
 * The central Jotai store instance for the application.
 */
export const store = createStore();

