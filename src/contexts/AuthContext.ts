import { createContext } from 'react';
import type { User } from '../types/user.types';


type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

