import { useSearch } from "../../hooks/useSearch";
import { useLoadingAndError } from "../../hooks/useLoadingAndError";
import { useState } from "react";
import "./styles.css";

export const SearchForm: React.FC = () => {
  const { searchUsers } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const { setError, setLoading } = useLoadingAndError();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await searchUsers(inputValue);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("Произошла ошибка при поиске. Пожалуйста, попробуйте снова.");
    }
  };

  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </form>
    </div>
  );
};
