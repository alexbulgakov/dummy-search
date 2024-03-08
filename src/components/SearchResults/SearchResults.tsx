import {
  Placeholder,
  Pagination,
  SimpleCell,
  Spinner,
  Avatar,
  Footer,
  Group,
} from "@vkontakte/vkui";
import {
  Icon56CancelCircleOutline,
  Icon56UsersOutline,
} from "@vkontakte/icons";
import { useEffect, useState } from "react";
import plural from "plural-ru";

import { useLoadingAndError } from "../../hooks/useLoadingAndError";
import { responseLengthLimit } from "../../utils/constants";
import { useSearch } from "../../hooks/useSearch";

export function SearchResults() {
  const { searchResults, searchUsers, query, total } = useSearch();
  const { isLoading, error } = useLoadingAndError();

  const { setLoading, setError } = useLoadingAndError();
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
      <Group style={{ height: "640px" }}>
        {isLoading ? (
          <Spinner size="medium" />
        ) : (
          <>
            {searchResults.map((user) => (
              <SimpleCell
                before={<Avatar src={user.image} size={48} />}
                subtitle={user.address.city}
                key={user.id}
              >{`${user.firstName} ${user.lastName}`}</SimpleCell>
            ))}
            {currentPage === 1 && (
              <Footer>
                {plural(total, "Найден", "Найдено", "Найдено")} {total}{" "}
                {plural(total, "друг", "друга", "друзей")}
              </Footer>
            )}
          </>
        )}
      </Group>
      {searchResults.length > 0 && (
        <Pagination
          disabled={isLoading ? true : false}
          totalPages={calculatedTotalPages}
          style={{ marginTop: "10px" }}
          currentPage={currentPage}
          onChange={handleChange}
          boundaryCount={1}
          siblingCount={0}
        />
      )}
    </Group>
  );
}
