import { createContext } from 'react';

import { EditorState } from '../types';

export const EditorContext = createContext<EditorState | null>(null);
