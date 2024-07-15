import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import Constants from 'expo-constants';
import { useStorageState } from '../hooks/useStorageState';

interface AuthContextProps {
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  updateUser: (updatedInfo: User) => Promise<void>;
}

interface Credentials {
  username: string;
  password: string;
}

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useStorageState<User | null>('authUser', null);
  const [session, setSession] = useStorageState<string | null>('authToken', null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuthenticated = session !== null;

  const configHeaders = () => ({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });

  const apiBaseURL = (resource: string): string => {
    return `${Constants.expoConfig?.extra?.apiBaseURL}${resource}`;
  };

  const handleError = (error: any) => {
    throw error;
  };

  const signIn = async (credentials: Credentials): Promise<void> => {
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   apiBaseURL('/auth/login'),
      //   {
      //     username: credentials.username,
      //     password: credentials.password,
      //   },
      //   configHeaders()
      // );
      // const { token, user } = response.data;
      const token = 'test'; // Simulação
      const user: User = {
        id: '1',
        cpf: '000.000.000-00',
        nome: 'Test User',
        perfil: 'admin',
        ativo: true,
        password: 'testpassword',
        criadoPor: 'system',
        criadoEm: new Date(),
        atualizadoPor: 'system',
        atualizadoEm: new Date(),
      }; // Simulação
      await setSession(token);
      await setUser(user);
    } catch (error) {
      console.error('error', error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedInfo: User) => {
    setIsLoading(true);
    try {
      // Simulação de atualização de usuário
      // const response = await axios.put(apiBaseURL('/user/update'), updatedInfo, configHeaders());
      const updatedUser = { ...user, ...updatedInfo };
      await setUser(updatedUser);
    } catch (error) {
      console.error('error', error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: DecodedToken = jwt.jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Failed to decode token', error);
      return true;
    }
  };

  const signOut = async () => {
    await setSession(null);
    await setUser(null);
  };

  useEffect(() => {
    // Simulate a session check on mount (e.g., checking token validity)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulated delay
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isLoading, isAuthenticated, updateUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
