import { useSearch } from "../../hooks/useSearch";
import { useLoadingAndError } from "../../hooks/useLoadingAndError";
import { useEffect, useState } from "react";
import { Group, Search } from "@vkontakte/vkui";

export const SearchForm: React.FC = () => {
  const { searchUsers, setQuery } = useSearch();
  const { setError, setLoading } = useLoadingAndError();
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const performSearch = async () => {
      try {
        setLoading(true);
        await searchUsers(search);
        setError(null);
      } catch (err) {
        setError("Произошла ошибка при поиске.");
      } finally {
        setLoading(false);
      }
    };

    if (search !== "") {
      performSearch();
    } else {
      setLoading(false);
      setError(null);
    }
  }, [search, searchUsers, setError, setLoading]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.trim() === "") {
      setQuery("");
      setSearch(newValue);
      setInputValue(newValue);
    } else {
      setSearch(newValue);
    }
  };

  return (
    <Group>
      <Search value={inputValue} after={null} onChange={onChange} />
    </Group>
  );
};
