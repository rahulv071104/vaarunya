import { Dispatch, SetStateAction } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionSelected?: (value: string) => void;
  onSearchSubmit?: (query: string) => void;
}

declare const SearchBar: (props: SearchBarProps) => JSX.Element;
export default SearchBar;
