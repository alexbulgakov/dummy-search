import { FunctionComponent, createContext, ReactNode, useState } from "react";

interface LoadingAndErrorContextType {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  error: string | null;
  isLoading: boolean;
}

export const LoadingAndErrorContext = createContext<
  LoadingAndErrorContextType | undefined
>(undefined);

export const LoadingAndErrorProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <LoadingAndErrorContext.Provider
      value={{ setLoading, isLoading, setError, error }}
    >
      {children}
    </LoadingAndErrorContext.Provider>
  );
};
