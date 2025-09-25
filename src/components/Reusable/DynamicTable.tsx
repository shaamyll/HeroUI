import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Skeleton,
  Tab,
  Tabs,
  SelectItem,
  Select,
} from "@heroui/react";
import { FolderOpen, Grid3X3, List, Plus, RotateCcw, Search } from "lucide-react";
import { motion } from "framer-motion";
import type { Selection, SortDescriptor } from "@heroui/react";
import SearchableSelect from "./SearchableSelect";

export interface TableColumnProps {
  name: string;
  headerId: string;
  sortable?: boolean;
  render?: (item: any) => React.ReactNode;
}

export interface TableContent {
  [key: string]: any;
}

export interface CardComponent {
  item: any;
  onView: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

interface TableComponentProps {
  TableContent: TableContent[];
  TableStructure?: Array<{
    render: any; name: string; headerId: string; sortable?: boolean
  }>;
  searchPlaceholder: string;
  CardComponent?: React.ComponentType<CardComponent>;
  statusOptions?: Array<{ name: string; uid: string }>;
  filters?: Array<{ name: string; uid: string; content: Array<{ name: string; uid: string }>, showSearch?: boolean, dependsOn?: string }>;
  onFiltersChange?: (filters: { uid: string; values: { value: string; label: string }[] }[]) => void;
  onSearchValueChange?: (value: string) => void;
  onSortChange?: (sortDescriptor: SortDescriptor) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  statusColorMap?: Record<string, string>;
  onDelete?: (id: number) => void;
  onEdit?: (data: any) => void;
  onAdd?: (data: any) => void;
  type?: any;
  isSearch: boolean;
  isSelectRows: boolean;
  isLoading?: boolean;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
}

export default function DynamicTable({
  TableContent,
  TableStructure = [],
  searchPlaceholder,
  CardComponent,
  filters = [],
  onFiltersChange,
  onSearchValueChange,
  onSortChange,
  onPageChange,
  onRowsPerPageChange,
  onAdd,
  type,
  isSearch,
  isSelectRows,
  isLoading = false,
  totalItems,
  currentPage,
  totalPages,
  rowsPerPage,
}: TableComponentProps) {

  // headerData for columns Headers
  const columns = React.useMemo<TableColumnProps[]>((): any => {
    return TableStructure.map(col => ({
      name: col.name,
      headerId: col.headerId,
      render: col.render,
      sortable: col.sortable || false,
    }));
  }, [TableStructure]);

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchValue, setSearchValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [activeFilters, setActiveFilters] = useState<
    Record<string, Set<{ value: string; label: string }>>
  >({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: columns[0]?.headerId || "id",
    direction: "ascending" as const,
  });

  // Check if any filters are active
  const hasActiveFilters = React.useMemo(() => {
    return Object.values(activeFilters).some(set => set.size > 0);
  }, [activeFilters]);

  //search
  const onSearchChange = React.useCallback((value: string) => {
    setSearchValue(value);
    onSearchValueChange?.(value);
  }, [onSearchValueChange]);

  //search clear
  const onClear = React.useCallback(() => {
    setSearchValue("");
    onSearchValueChange?.("");
  }, [onSearchValueChange]);

  //Sort
  const handleSortChange = React.useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    onSortChange?.(descriptor);
  }, [onSortChange]);

  const handlePageChange = React.useCallback((page: number) => {
    onPageChange?.(page);
  }, [onPageChange]);

  const handleRowsPerPageChange = React.useCallback((e: any) => {
    const newRowsPerPage = Number(e.target.value);
    onRowsPerPageChange?.(newRowsPerPage);
  }, [onRowsPerPageChange]);

  const handleFilterChange = useCallback(
    (filterKey: string, selectedOption: { value: string; label: string } | null) => {
      let newFilters: Record<string, Set<any>>;

      if (!selectedOption) {
        newFilters = { ...activeFilters, [filterKey]: new Set() };
      } else {
        newFilters = { ...activeFilters, [filterKey]: new Set([selectedOption]) };
      }

      setActiveFilters(newFilters);

      // callback array format to parent
      if (typeof onFiltersChange === "function") {
        const arrFilters = Object.entries(newFilters).map(([uid, set]) => ({
          uid,
          values: Array.from(set),
        }));
        onFiltersChange(arrFilters);
      }
    },
    [activeFilters, onFiltersChange]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    const reset: Record<string, Set<any>> = {};
    filters.forEach(filter => {
      reset[filter.uid] = new Set();
    });
    setActiveFilters(reset);
    setSearchValue("");
    onSearchValueChange?.("");

    // notify parent
    if (typeof onFiltersChange === "function") {
      const arrFilters = filters.map(filter => ({
        uid: filter.uid,
        values: [],
      }));
      onFiltersChange(arrFilters);
    }
  }, [filters, onFiltersChange, onSearchValueChange]);

  const topContent = React.useMemo(() => {
    return (
      <div
        className={`flex flex-col gap-4 ${filters.length > 0 || hasActiveFilters ? "my-4" : "mt-4 mb-1"
          }`}
      >
        {/* Top Row: Title, Search, Toggle, Add New */}
        <div className="flex flex-wrap items-center gap-2 w-full">
          {/* Title */}
          <div className="bg-white rounded-lg px-4 py-2 border-2 flex-shrink-0">
            <h2 className="text-md font-semibold text-black">
              {type}s ({totalItems})
            </h2>
          </div>

          {/* Search Bar always visible */}
          {isSearch && (
            <div className="flex-grow min-w-[200px]">
              <Input
                size="md"
                isClearable
                classNames={{
                  base: "w-full",
                  inputWrapper: "font-extrabold bg-white py-5",
                  input:
                    "placeholder:text-gray-500 placeholder:font-medium",
                }}
                placeholder={searchPlaceholder}
                startContent={<Search className="w-4 h-4 text-gray-500" />}
                value={searchValue}
                variant="faded"
                onClear={onClear}
                onValueChange={onSearchChange}
                isDisabled={isLoading}
              />
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center gap-0 bg-gray-100 border border-gray-300 rounded-lg px-1.5 py-1 shadow-sm overflow-visible flex-shrink-0">
            <Tabs
              aria-label="View mode"
              selectedKey={viewMode}
              onSelectionChange={(key) =>
                setViewMode(key as "table" | "grid")
              }
              variant="solid"
              classNames={{
                tabList: "gap-1 p-0 overflow-visible bg-gray-100",
                cursor: "",
                tab: "px-2 rounded-sm relative z-10",
                tabContent: "hover:text-gray-600",
              }}
            >
              <Tab
                key="table"
                title={<List className="w-4 h-4" />}
                isDisabled={isLoading}
              />
              <Tab
                key="grid"
                title={<Grid3X3 className="w-4 h-4" />}
                isDisabled={isLoading}
              />
            </Tabs>
          </div>

          {/* Add New Button */}
          <div className="flex-shrink-0">
            {onAdd && (
              <Button
                className="bg-gradient-to-r rounded-lg from-[#37125d] to-[#5a2d8a] text-white font-semibold"
                size="md"
                onPress={() => onAdd(type)}
                isDisabled={isLoading}
                startContent={<Plus className="h-4 w-4"/>}
              >
                Create {type}
              </Button>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-2 w-full rounded-lg">
          {filters.length > 0 &&
            filters.map((filter) => {
              const dependsOn = filter.dependsOn;
              const hasDependency = !!dependsOn;

              const dependencySatisfied = !hasDependency ||
                (dependsOn !== undefined &&
                  activeFilters[dependsOn]?.size > 0);

              const isDisabled = isLoading || (hasDependency && !dependencySatisfied);

              return (
                <SearchableSelect
                  key={filter.uid}
                  options={filter.content.map((option) => ({
                    value: option.uid,
                    label: option.name,
                  }))}
                  value={
                    activeFilters[filter.uid] && activeFilters[filter.uid].size > 0
                      ? Array.from(activeFilters[filter.uid])[0]
                      : null
                  }
                  placeholder={`Select ${filter.name}`}
                  searchPlaceholder={`Search ${filter.name}..`}
                  onChange={(val:any) => handleFilterChange(filter.uid, val)}
                  buttonClassName="min-w-[100px] max-w-[220px] flex-auto  justify-between"
                  showSearch={filter.showSearch || false}
                  disabled={isDisabled}
                  // matchWidth={true}
                />
              );
            })}

          {hasActiveFilters && (
            <Button
              size="md"
              color="warning"
              variant="flat"
              startContent={<RotateCcw className="w-4 h-4 " />}
              className=" font-medium hover:opacity-90 transition"
              onPress={resetFilters}
              isDisabled={isLoading}
            >
              Reset All
            </Button>
          )}
        </div>

      </div>
    );
  }, [
    searchValue,
    activeFilters,
    totalItems,
    onSearchChange,
    rowsPerPage,
    isLoading,
    type,
    isSearch,
    viewMode,
    onAdd,
    filters,
    hasActiveFilters,
    resetFilters,
    handleFilterChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="pb-10 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
        {/* Rows per page */}
        <div className="flex justify-between items-center w-full sm:w-auto text-sm text-gray-600">
          {isLoading ? (  
            <Skeleton className="h-8 w-32" />
          ) : (
            <>
              <span className="font-medium text-gray-500">Rows per page:</span>
              <Select
                size="sm"
                variant="flat"
                aria-label="Rows per page"
                className="ml-2 w-[100px]"
                selectedKeys={[String(rowsPerPage)]}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0];
                  if (val) handleRowsPerPageChange({ target: { value: val } } as any);
                }}
                isDisabled={isLoading}
              >
                <SelectItem key="5">5</SelectItem>
                <SelectItem key="10">10</SelectItem>
                <SelectItem key="15">15</SelectItem>
              </Select>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center w-full sm:w-auto">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-8" />
              ))}
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          ) : (
            <Pagination
              isCompact
              showControls
              showShadow
              page={currentPage}
              total={totalPages}
              onChange={handlePageChange}
              isDisabled={isLoading}
              classNames={{
                cursor: "bg-[#37125d] text-white",
              }}
            />
          )}
        </div>
      </div>
    );
  }, [selectedKeys, currentPage, totalPages, isLoading, rowsPerPage, handleRowsPerPageChange, handlePageChange]);

  // Default cell renderer (only used if no `render` provided from parent)
  const defaultRenderCell = useCallback(
    (item: any, columnKey: string) => {
      const cellValue = item[columnKey];
      if (typeof cellValue === "object" && cellValue !== null) {
        return cellValue.name || JSON.stringify(cellValue);
      }
      return cellValue;
    },
    []
  );

  const handleRowAction = () => {
    // This function intentionally does nothing to prevent row selection
    return;
  };

  // Generate skeleton table rows
  const generateSkeletonRows = () => {
    return Array.from({ length: rowsPerPage }, (_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {columns.map((column, colIndex) => (
          <TableCell key={column.headerId}>
            <div className="flex items-center gap-2">
              {colIndex === 0 && isSelectRows && (
                <Skeleton className="h-4 w-4 rounded-sm" />
              )}
              <Skeleton
                className={`h-4 rounded-sm ${colIndex === 0
                  ? "w-20"
                  : colIndex === 1
                    ? "w-32"
                    : colIndex === 2
                      ? "w-24"
                      : "w-16"
                  }`}
              />
            </div>
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  // Generate skeleton cards for grid view
  const generateSkeletonCards = () => {
    return Array.from({ length: rowsPerPage }, (_, index) => (
      <div key={`skeleton-card-${index}`} className="rounded-lg p-4 bg-white shadow-sm">
        <Skeleton className="h-32 w-full mb-3 rounded" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    ));
  };

  // Grid View Component
  const GridView = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {generateSkeletonCards()}
        </div>
      );
    }

    if (TableContent.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-10 min-h-[500px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100"
          >
            <FolderOpen className="h-12 w-12 text-gray-400" />
          </motion.div>
          <h3 className="text-lg font-bold text-gray-700">
            No {type}s Found
          </h3>
          <p className="max-w-sm text-center text-md text-gray-500">
            It looks like there are no {type}s available at the moment.
            Try adjusting your search or filters.
          </p>
        </div>
      );
    }

    return (
      <div className="p-3">
        <div className="grid gap-4 
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
      auto-rows-fr
      bg-gradient-to-br from-gray-50 via-white to-gray-50
      rounded-2xl">
          {TableContent.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {CardComponent && (
                <CardComponent
                  item={item}
                  onView={(item: any) => console.log("View:", item)}
                  onEdit={(item: any) => console.log("Edit:", item)}
                  onDelete={(item: any) => console.log("Delete:", item)}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full mx-auto"
    >
      {topContent}

      {/* Selection Action Bar directly above the table */}
      {!isLoading && isSelectRows && (selectedKeys === "all" || selectedKeys.size > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex justify-between items-center bg-gradient-to-r from-[#37125c] via-[#4a1777] to-[#37125c] text-white px-6 py-1.5 rounded-lg my-3"
        >
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {selectedKeys === "all"
                ? `All ${totalItems} items selected`
                : `${selectedKeys.size} of ${totalItems} selected`}
            </span>
            <button
              onClick={() => setSelectedKeys(new Set([]))}
              className="text-white/90 underline text-sm hover:text-white transition-colors duration-200"
            >
              Clear Selection
            </button>
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              variant="flat"
              className="bg-white/90 text-[#37125c] hover:bg-white font-medium shadow-md"
            >
              Print Code
            </Button>
            <Button
              size="sm"
              color="danger"
              className="bg-[#e53e3e] hover:bg-[#c53030] font-medium shadow-md"
            >
              Delete Selected
            </Button>
          </div>
        </motion.div>
      )}

      {/* Conditional rendering based on viewMode */}
      {viewMode === 'grid' ? (
        <div>
          <div className="bg-white rounded-xl shadow-md mb-5 ">
            <GridView />
          </div>
          {bottomContent}
        </div>
      ) : (
        <Table
          isHeaderSticky
          aria-label="Dynamic table with all columns"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "min-h-[500px] w-full mx-auto overflow-x-auto",
            table: "min-w-full",
          }}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          sortDescriptor={sortDescriptor}
          topContentPlacement="outside"
          onSortChange={handleSortChange}
          onRowAction={handleRowAction}
          selectionBehavior={isSelectRows ? "toggle" : "replace"}
          checkboxesProps={{ color: "primary" }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.headerId}
                allowsSorting={column.sortable && !isLoading}
                className="text-sm"
              >
                {isLoading ? (
                  <Skeleton className="h-4 w-20 rounded-sm" />
                ) : (
                  column.name
                )}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            emptyContent={isLoading ? "" : (
              <div className="flex flex-col items-center justify-center space-y-4 py-10 min-h-[400px]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100"
                >
                  <FolderOpen className="h-12 w-12 text-gray-400" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-700">
                  No {type}s Found
                </h3>
                <p className="max-w-sm text-center text-md text-gray-500">
                  It looks like there are no {type}s available at the moment.
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
            items={isLoading ? [] : TableContent}
          >
            {isLoading ? (
              generateSkeletonRows().map((skeletonRow) => skeletonRow)
            ) : (
              TableContent.map((item, index) => (
                <TableRow key={item.id || Math.random()}>
                  {(columnKey) => {
                    const col = columns.find((c) => c.headerId === columnKey);
                    return (
                      <TableCell>
                        <motion.div
                          initial={{ opacity: 0, y: 25, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {col?.render
                            ? col.render(item)
                            : defaultRenderCell(item, columnKey as string)}
                        </motion.div>
                      </TableCell>
                    );
                  }}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
}