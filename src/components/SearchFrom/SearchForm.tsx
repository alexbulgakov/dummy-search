import { useSearch } from "../../hooks/useSearch";
import { useState } from "react";
import "./styles.css";

export const SearchForm: React.FC = () => {
  const { searchUsers } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchUsers(inputValue);
  };

  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </form>
    </div>
  );
};
