import React, { useState } from 'react';
import Icon from '@/components/AppIcon';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder, suggestions = [], onSuggestionSelected, onSearchSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const suggestedItems = suggestions.length > 0 ? suggestions : [
    'Turmeric Powder', 'Basmati Rice', 'Organic Cotton', 'Cardamom',
    'Black Pepper', 'Cumin Seeds', 'Handicrafts', 'Textiles'
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && 
    searchQuery.length > 0
  );

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    if (onSuggestionSelected) onSuggestionSelected(suggestion);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'ring-2 ring-primary/20' : ''
      }`}>
        <div className="absolute left-3 z-10">
          <Icon name="Search" size={20} className="text-secondary-light" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearchSubmit) {
              onSearchSubmit(searchQuery.trim());
            }
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white border border-border rounded-lg focus:outline-none focus:border-primary transition-all duration-300"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 z-10 p-1 hover:bg-accent rounded-full transition-colors duration-300"
          >
            <Icon name="X" size={16} className="text-secondary-light" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-hover z-20 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-secondary-light mb-2 px-2">Suggestions</div>
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-accent hover:text-primary rounded-lg transition-all duration-300 flex items-center"
              >
                <Icon name="Search" size={14} className="mr-2 text-secondary-light" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches */}
      {isFocused && searchQuery.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-hover z-20">
          <div className="p-2">
            <div className="text-xs text-secondary-light mb-2 px-2">Popular Searches</div>
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-accent hover:text-primary rounded-lg transition-all duration-300 flex items-center"
              >
                <Icon name="TrendingUp" size={14} className="mr-2 text-secondary-light" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;