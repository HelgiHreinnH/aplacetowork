import React from 'react';

interface SearchHeaderProps {
  resultsCount: number;
  isExactMatch: boolean;
}

const SearchHeader = ({ resultsCount, isExactMatch }: SearchHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-[32px] font-bold text-foreground mb-4">Search Results</h2>
      {!isExactMatch && (
        <p className="text-lg text-muted-foreground">
          There is no exact match to your desired scenario, but here are our closest results
        </p>
      )}
      <p className="mt-2 text-lg text-[#F97316]">
        Found {resultsCount} {isExactMatch ? 'matching' : 'relevant'} facilities
      </p>
    </div>
  );
};

export default SearchHeader;