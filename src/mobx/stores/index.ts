import { createContext } from 'react';

import IllustsStore from './IllustsStore';

export const GlobalIllustsStore = createContext(new IllustsStore());
