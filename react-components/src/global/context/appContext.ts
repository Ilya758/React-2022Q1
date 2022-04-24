import { createContext } from 'react';
import { TAppProps } from '../../App.types';

export const AppContext = createContext<TAppProps | null>(null);
