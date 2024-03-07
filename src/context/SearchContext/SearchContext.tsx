import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  FunctionComponent,
} from "react";

import api from "../../utils/api";
import { selectedUserData } from "../../utils/constants";
import defaultPhoto from "../../public/defaultPhoto.png";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: {
    city: string;
  };
}

interface ApiResponse {
  users: User[];
  limit: number;
  skip: number;
  total: number;
}

interface SearchContextType {
  searchResults: User[];
  query: string;
  setQuery: (query: string) => void;
  searchUsers: (searchQuery: string) => Promise<void>;
}

const defaultSearchContextValue: SearchContextType = {
  searchResults: [],
  query: "",
  setQuery: () => {},
  searchUsers: async () => {},
};

export const SearchContext = createContext<SearchContextType>(
  defaultSearchContextValue
);

export const SearchProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [query, setQuery] = useState("");

  const searchUsers = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    try {
      const data = await api.getItems<ApiResponse>(
        `users/search?&select=${selectedUserData}&q=${searchQuery}`
      );

      const users = data.users.map((user: Partial<User>) => ({
        id: user.id ?? 0,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        image: user.image ?? defaultPhoto,
        address: {
          city: user.address?.city ?? "City unknown",
        },
      }));
      setSearchResults(users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSearchResults([]);
      throw error;
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{ searchResults, query, searchUsers, setQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};
