import IllustsStore from './IllustsStore';
import { createContext } from 'react';

export const GlobalIllustsStore = createContext(new IllustsStore());
