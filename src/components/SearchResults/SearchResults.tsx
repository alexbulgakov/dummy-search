import { useSearch } from "../../hooks/useSearch";

import { UserCard } from "../UserCard/UserCard";

import "./style.css";

export function SearchResults() {
  const { searchResults } = useSearch();

  return (
    <div className="usersList">
      {searchResults.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
