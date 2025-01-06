import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { ICON } from "../config/config";
import Svg from "./Svg";

type SearchPropType = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDownSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

const Search = ({
  onSearchChange,
  isLoading,
  onKeyDownSearch,
}: SearchPropType) => {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearchClicked = () => {
    if (!searchRef.current || !searchRef.current.value.trim()) return;
    searchRef.current.value = "";
  };

  return (
    <label htmlFor="ip-address" className="search-label">
      <input
        className="search-input"
        type="search"
        id="ip-address"
        name="ip-address"
        placeholder="Search for any IP address or domain"
        aria-label="Search for any IP address or domain"
        onKeyDown={onKeyDownSearch}
        onChange={onSearchChange}
        ref={searchRef}
      />

      <div className="search__icons">
        {!isLoading && (
          <button className="btn btn--search" onClick={handleSearchClicked}>
            <Svg
              id={ICON.DELETE}
              className={"search--container close"}
              alt={"Icon Close"}
            />

            <Svg
              id={ICON.SEARCH}
              className={"search--container arrow"}
              alt={"Icon Arrow"}
            />
          </button>
        )}

        {isLoading && (
          <Svg
            id={ICON.SPINNER}
            className={"search--container ip-address__spinner spinner"}
            alt={"Icon loading"}
          />
        )}
      </div>
    </label>
  );
};

export default Search;
