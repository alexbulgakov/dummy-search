import {
  FunctionComponent,
  createContext,
  useCallback,
  ReactNode,
  useState,
} from "react";

import { responseLengthLimit, selectedUserData } from "../../utils/constants";
import defaultPhoto from "../../public/defaultPhoto.png";
import api from "../../utils/api";

interface User {
  address: {
    city: string;
  };
  firstName: string;
  lastName: string;
  image: string;
  id: number;
}

interface ApiResponse {
  users: User[];
  limit: number;
  total: number;
  skip: number;
}

interface SearchContextType {
  searchUsers: (searchQuery: string, skip: number) => Promise<void>;
  setQuery: (query: string) => void;
  searchResults: User[];
  query: string;
  total: number;
}

const defaultSearchContextValue: SearchContextType = {
  searchUsers: async () => {},
  setQuery: () => {},
  searchResults: [],
  query: "",
  total: 0,
};

export const SearchContext = createContext<SearchContextType>(
  defaultSearchContextValue
);

export const SearchProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);

  const searchUsers = useCallback(async (searchQuery: string, skip: number) => {
    setQuery(searchQuery);

    try {
      const data = await api.getItems<ApiResponse>(
        `users/search?limit=${responseLengthLimit}&skip=${skip}&select=${selectedUserData}&q=${searchQuery}`
      );

      setTotal(data.total);

      const users = data.users.map((user: Partial<User>) => ({
        address: {
          city: user.address?.city ?? "City unknown",
        },
        image: user.image ?? defaultPhoto,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        id: user.id ?? 0,
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
      value={{ searchResults, searchUsers, setQuery, query, total }}
    >
      {children}
    </SearchContext.Provider>
  );
};
