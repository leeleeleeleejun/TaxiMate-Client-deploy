import {
  SearchBarContainer,
  SearchBarWrapper,
} from '@/components/Home/SearchBar/SearchBar.style.ts';
import SearchIcon from '@/assets/icons/map/search-icon.svg?react';

const SearchBar = ({ path }: { path: string }) => {
  return (
    <SearchBarWrapper to={path}>
      <SearchIcon />
      <SearchBarContainer>장소 또는 주소를 검색하세요</SearchBarContainer>
    </SearchBarWrapper>
  );
};

export default SearchBar;
