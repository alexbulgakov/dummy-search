import { useSearch } from "../../hooks/useSearch";
import { useLoadingAndError } from "../../hooks/useLoadingAndError";
import { useEffect, useState } from "react";
import { Group, Search } from "@vkontakte/vkui";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchForm: React.FC = () => {
  const { searchUsers, setQuery } = useSearch();
  const { setError, setLoading } = useLoadingAndError();
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
      const queryValue = newValue.trim().split(/\s+/).join("&");
      setSearch(queryValue);
    }
  };

  return (
    <Group>
      <Search value={inputValue} after={null} onChange={onChange} />
    </Group>
  );
};
