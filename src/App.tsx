import {
  SplitLayout,
  PanelHeader,
  usePlatform,
  SplitCol,
  AppRoot,
  Panel,
  View,
} from "@vkontakte/vkui";
import { Icon36LogoVk } from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";

import { LoadingAndErrorProvider } from "./context/LoadingAndErrorContext/LoadingAndErrorContext";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { SearchProvider } from "./context/SearchContext/SearchContext";
import { SearchForm } from "./components/SearchForm/SearchForm";

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
                  <PanelHeader before={<Icon36LogoVk />}>
                    Поиск друзей
                  </PanelHeader>
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
