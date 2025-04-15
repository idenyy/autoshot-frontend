import React, { createContext, useCallback, useContext, useState } from "react";
import {
  FilterContextType,
  FilterState,
  SortOrder,
} from "@/types/filter.interface";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<FilterState>({
    activeTab: "Products",
    category: undefined,
    supplier: undefined,
    searchTerm: undefined,
    sortBy: undefined,
    order: undefined,
    tempCategory: undefined,
    tempSupplier: undefined,
    tempSearchTerm: undefined,
  });

  const [showFilters, setShowFilters] = useState(false);

  const setActiveTab = (activeTab: string) =>
    setState((prev) => ({ ...prev, activeTab }));

  const setTempCategory = (tempCategory?: string) =>
    setState((prev) => ({ ...prev, tempCategory }));

  const setTempSupplier = (tempSupplier?: string) =>
    setState((prev) => ({ ...prev, tempSupplier }));

  const setTempSearchTerm = (tempSearchTerm?: string) =>
    setState((prev) => ({ ...prev, tempSearchTerm }));

  const applyFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      category: prev.tempCategory,
      supplier: prev.tempSupplier,
      searchTerm: prev.tempSearchTerm,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      category: undefined,
      supplier: undefined,
      searchTerm: undefined,
      sortBy: undefined,
      order: undefined,
      tempSupplier: undefined,
      tempCategory: undefined,
      tempSearchTerm: undefined,
    }));
  }, []);

  const toggleSort = useCallback((field: string, direction?: SortOrder) => {
    setState((prev) => ({
      ...prev,
      sortBy: field,
      order: direction,
    }));
  }, []);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        showFilters,
        setShowFilters,
        setActiveTab,
        applyFilters,
        resetFilters,
        toggleSort,
        setTempCategory,
        setTempSupplier,
        setTempSearchTerm,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("useFilters must be used within a FilterProvider");

  return context;
};
