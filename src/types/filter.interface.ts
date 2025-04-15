export type SortOrder = "asc" | "desc";

export interface FilterState {
  activeTab?: string;
  category?: string;
  supplier?: string;
  searchTerm?: string;
  sortBy?: string;
  order?: SortOrder;
  tempCategory?: string;
  tempSupplier?: string;
  tempSearchTerm?: string;
}

export interface FilterContextType extends FilterState {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  setActiveTab: (activeTab: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  toggleSort: (field: string, direction?: SortOrder) => void;
  setTempCategory: (id?: string) => void;
  setTempSupplier: (id?: string) => void;
  setTempSearchTerm: (term?: string) => void;
}
