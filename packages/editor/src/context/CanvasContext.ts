import { createContext } from 'react';
import { CanvasState } from '../types';

export const CanvasContext = createContext<CanvasState | null>(null);
