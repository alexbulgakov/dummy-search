import { useSearch } from "../../hooks/useSearch";
import { useLoadingAndError } from "../../hooks/useLoadingAndError";

import { UserCard } from "../UserCard/UserCard";

import "./style.css";

export function SearchResults() {
  const { searchResults } = useSearch();
  const { isLoading, error } = useLoadingAndError();

  if (isLoading) {
    return <div className="loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="usersList">
      {searchResults.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
