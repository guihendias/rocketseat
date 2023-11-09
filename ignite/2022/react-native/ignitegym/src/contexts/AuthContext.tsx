import { createContext, ReactNode } from "react";

type AuthContextData = {
  // Define your context data here
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  // Define your provider logic here

  return (
    <AuthContext.Provider
      value={
        {
          /* Pass your context data here */
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
