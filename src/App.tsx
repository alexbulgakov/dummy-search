import { SearchResults } from "./components/SearchResults/SearchResults";
import { LoadingAndErrorProvider } from "./context/LoadingAndErrorContext/LoadingAndErrorContext";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { SearchProvider } from "./context/SearchContext/SearchContext";
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  usePlatform,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

export default function App() {
  const platform = usePlatform();

  return (
    <LoadingAndErrorProvider>
      <SearchProvider>
        <AppRoot>
          <SplitLayout
            header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
          >
            <SplitCol autoSpaced>
              <View activePanel="find">
                <Panel
                  style={{ maxWidth: "800px", margin: "0 auto" }}
                  id="find"
                >
                  <PanelHeader>Поиск друзей</PanelHeader>
                  <SearchForm />
                  <SearchResults />
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </SearchProvider>
    </LoadingAndErrorProvider>
  );
}
