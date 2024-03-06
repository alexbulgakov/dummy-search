import { SearchForm } from "./components/SearchFrom/SearchForm";
import { SearchResults } from "./components/SearchResults/SearchResults";

import { SearchProvider } from "./context/SearchContext/SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <SearchForm />
      <SearchResults />
    </SearchProvider>
  );
}
