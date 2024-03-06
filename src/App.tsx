import { SearchResults } from "./components/SearchResults/SearchResults";
import { LoadingAndErrorProvider } from "./context/LoadingAndErrorContext/LoadingAndErrorContext";
import { SearchForm } from "./components/SearchFrom/SearchForm";
import { SearchProvider } from "./context/SearchContext/SearchContext";

export default function App() {
  return (
    <LoadingAndErrorProvider>
      <SearchProvider>
        <SearchForm />
        <SearchResults />
      </SearchProvider>
    </LoadingAndErrorProvider>
  );
}
