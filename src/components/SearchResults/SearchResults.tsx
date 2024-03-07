import { useSearch } from "../../hooks/useSearch";
import { useLoadingAndError } from "../../hooks/useLoadingAndError";
import plural from "plural-ru";
import {
  Avatar,
  Footer,
  Group,
  Pagination,
  Placeholder,
  SimpleCell,
  Spinner,
} from "@vkontakte/vkui";
import {
  Icon56CancelCircleOutline,
  Icon56UsersOutline,
} from "@vkontakte/icons";
import { responseLengthLimit } from "../../utils/constants";
import { useEffect, useState } from "react";

export function SearchResults() {
  const { searchResults, query, searchUsers, total } = useSearch();
  const { isLoading, error } = useLoadingAndError();

  const { setError, setLoading } = useLoadingAndError();
  const [currentPage, setCurrentPage] = useState(1);

  const calculatedTotalPages = Math.ceil(total / responseLengthLimit);

  const performSearch = async (currentPage: number) => {
    const skip = (currentPage - 1) * responseLengthLimit;

    try {
      setLoading(true);
      await searchUsers(query, skip);
      setError(null);
    } catch (err) {
      setError("Произошла ошибка при поиске.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <Group style={{ height: "630px" }}>
        {isLoading ? (
          <Spinner size="medium" />
        ) : (
          <>
            {searchResults.map((user) => (
              <SimpleCell
                before={<Avatar size={48} src={user.image} />}
                key={user.id}
                subtitle={user.address.city}
              >{`${user.firstName} ${user.lastName}`}</SimpleCell>
            ))}
            <Footer>
              {plural(total, "Найден", "Найдено", "Найдено")} {total}{" "}
              {plural(total, "друг", "друга", "друзей")}
            </Footer>
          </>
        )}
      </Group>
      {searchResults.length > 0 && (
        <Pagination
          currentPage={currentPage}
          siblingCount={1}
          boundaryCount={1}
          totalPages={calculatedTotalPages}
          disabled={isLoading ? true : false}
          onChange={handleChange}
        />
      )}
    </Group>
  );
}
