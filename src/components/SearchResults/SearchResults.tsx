import { useSearch } from "../../hooks/useSearch";
import { useLoadingAndError } from "../../hooks/useLoadingAndError";

import "./style.css";
import {
  Avatar,
  Footer,
  Group,
  Placeholder,
  SimpleCell,
  Spinner,
} from "@vkontakte/vkui";
import {
  Icon56CancelCircleOutline,
  Icon56UsersOutline,
} from "@vkontakte/icons";

export function SearchResults() {
  const { searchResults, query } = useSearch();
  const { isLoading, error } = useLoadingAndError();

  if (isLoading) {
    return <Spinner size="medium" style={{ margin: "20px 0" }} />;
  }

  if (error) {
    return (
      <Placeholder icon={<Icon56CancelCircleOutline />} header="Ошибка">
        Произошла ошибка сети. Попробуйте позже
      </Placeholder>
    );
  }

  if (query === "") {
    return (
      <Placeholder icon={<Icon56UsersOutline />} header="Поиск друзей">
        Начните вводить имя в строке поиска
      </Placeholder>
    );
  }

  return (
    <Group>
      {searchResults.map((user) => (
        <SimpleCell
          before={<Avatar size={48} src={user.image} />}
          key={user.id}
          subtitle={user.address.city}
        >{`${user.firstName} ${user.lastName}`}</SimpleCell>
      ))}

      {searchResults.length === 0 && query.length > 0 && (
        <Footer>Ничего не найдено</Footer>
      )}
    </Group>
  );
}
