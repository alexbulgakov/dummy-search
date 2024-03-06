import { createContext, useState, ReactNode, FunctionComponent } from "react";

interface LoadingAndErrorContextType {
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
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
      value={{ isLoading, error, setLoading, setError }}
    >
      {children}
    </LoadingAndErrorContext.Provider>
  );
};
