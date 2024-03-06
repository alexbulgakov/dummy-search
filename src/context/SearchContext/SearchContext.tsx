import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  FunctionComponent,
} from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: {
    city: string;
  };
}

interface SearchContextType {
  searchResults: User[];
  query: string;
  searchUsers: (searchQuery: string) => Promise<void>;
}

const defaultSearchContextValue: SearchContextType = {
  searchResults: [],
  query: "",
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
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${searchQuery}`
      );
      const data = await response.json();
      const users = data.users.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        address: {
          city: user.address.city,
        },
      }));
      setSearchResults(users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSearchResults([]);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ searchResults, query, searchUsers }}>
      {children}
    </SearchContext.Provider>
  );
};
