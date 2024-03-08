import { Search, Group } from "@vkontakte/vkui";
import { useEffect, useState } from "react";

import { useLoadingAndError } from "../../hooks/useLoadingAndError";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearch } from "../../hooks/useSearch";

export const SearchForm: React.FC = () => {
  const { searchUsers, setQuery } = useSearch();
  const { setLoading, setError } = useLoadingAndError();
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm) {
        try {
          setLoading(true);
          await searchUsers(debouncedSearchTerm, 0);
          setError(null);
        } catch (err) {
          setError("Произошла ошибка при поиске.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError(null);
      }
    };

    if (search !== "") {
      performSearch();
    } else {
      setLoading(false);
      setError(null);
    }
  }, [search, searchUsers, setError, setLoading, debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.trim() === "") {
      setQuery("");
      setSearch("");
      setInputValue("");
    } else {
      setSearch(newValue);
    }
  };

  return (
    <Group>
      <Search onChange={onChange} value={inputValue} after={null} />
    </Group>
  );
};
