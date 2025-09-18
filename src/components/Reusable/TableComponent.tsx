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
} from "@heroui/react";
import { ChevronLeft, ChevronRight, Grid3X3, List, RotateCcw, Search, UsersRound } from "lucide-react";
import { color, motion } from "framer-motion";
import CustomDropdown from "./CustomDropdown";
import type { Selection, SortDescriptor } from "@heroui/react";

export interface TableColumn {
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
  CardComponent?: React.ComponentType<CardComponent>;
  statusOptions?: Array<{ name: string; uid: string }>;
  filters?: Array<{ name: string; uid: string; content: Array<{ name: string; uid: string }>, showSearch?: boolean }>;
  statusColorMap?: Record<string, string>;
  onStatusChange?: (id: number, isActive: boolean) => void;
  onDelete?: (id: number) => void;
  onEdit?: (data: any) => void;
  onAdd?: (data: any) => void;
  type?: 'user' | 'project';
  isSearch: boolean;
  isSelectRows: boolean;
  isLoading?: boolean;
}

export default function TableComponent({
  TableContent,
  TableStructure = [],
  CardComponent,
  statusOptions = [],
  filters = [],
  onAdd,
  type,
  isSearch,
  isSelectRows,
  isLoading = false
}: TableComponentProps) {
  console.log(TableStructure)

  //  headerData for columns Headers
  const columns = React.useMemo<TableColumn[]>((): any => {
    return TableStructure.map(col => ({
      name: col.name,
      headerId: col.headerId,
      render: col.render,
      sortable: col.sortable || false,
    }));
  }, [TableStructure]);

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [activeFilters, setActiveFilters] = useState<Record<string, Set<string>>>({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: columns[0]?.headerId || "id",
    direction: "ascending" as const,
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  // Check if any filters are active
  const hasActiveFilters = React.useMemo(() => {
    return Object.values(activeFilters).some(set => set.size > 0);
  }, [activeFilters]);

  const filteredItems = React.useMemo(() => {
    if (isLoading) return [];

    let filteredData = [...TableContent];
    // Apply search filter
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    // Apply all active filters
    filteredData = filteredData.filter(item => {
      return Object.entries(activeFilters).every(([filterKey, filterValues]) => {
        // Skip if no filter values are selected for this filter
        if (filterValues.size === 0) return true;

        // Check if the item has the filter key and its value is in the selected filters
        const itemValue = item[filterKey];
        if (itemValue === undefined) return false;

        // Handle both single values and arrays of values
        const itemValues = Array.isArray(itemValue) ? itemValue : [itemValue];
        return Array.from(filterValues).some(value =>
          itemValues.some(itemVal =>
            String(itemVal).toLowerCase() === String(value).toLowerCase()
          )
        );
      });
    });

    return filteredData;
  }, [TableContent, filterValue, hasSearchFilter, activeFilters, isLoading]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    if (isLoading) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage, isLoading]);

  const sortedItems = React.useMemo(() => {
    if (isLoading) return [];
    return [...items].sort((a, b) => {
      const columnKey = sortDescriptor.column as string;
      const first = a[columnKey];
      const second = b[columnKey];
      if (first === undefined || second === undefined) return 0;
      const firstValue = typeof first === 'object' ? first.name : first;
      const secondValue = typeof second === 'object' ? second.name : second;
      if (firstValue < secondValue) return sortDescriptor.direction === "ascending" ? -1 : 1;
      if (firstValue > secondValue) return sortDescriptor.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [sortDescriptor, items, isLoading]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((filterKey: string, selected: Set<string>) => {
    // If the same item is clicked again, clear the filter for that key
    const newValue = activeFilters[filterKey]?.has(Array.from(selected)[0])
      ? new Set<string>()
      : selected;

    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: newValue
    }));
    setPage(1);
  }, [activeFilters]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    const resetFilters: Record<string, Set<string>> = {};
    filters.forEach(filter => {
      resetFilters[filter.uid] = new Set();
    });
    setActiveFilters(resetFilters);
    setPage(1);
  }, [filters]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 my-4">
        {/* Top Row: Title and Add New (mobile) or Title, Search, Add New (desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Title */}
          <div className="bg-gray-50 rounded-md px-4 py-1 shadow-sm flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-6 w-28 rounded-md" />
            ) : (
              <span className="font-medium">{type}s ({TableContent.length})</span>
            )}
          </div>

          {/* Desktop-only Search Bar */}
          <div className="hidden sm:flex flex-grow">
            {isSearch ? (
              isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  size="md"
                  isClearable
                  classNames={{
                    base: "w-full",
                    inputWrapper: "font-extrabold",
                  }}
                  placeholder={`search ${type}s..`}
                  startContent={<Search className="w-5 h-5 text-default-400" />}
                  value={filterValue}
                  variant="faded"
                  onClear={() => setFilterValue("")}
                  onValueChange={onSearchChange}
                  isDisabled={isLoading}
                />
              )
            ) : (
              <div className="min-h-[2.5rem]" />
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1.5 py-1 shadow-sm">
            {isLoading ? (
              <>
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </>
            ) : (
              <>
                <button
                  className={`p-2 rounded-md transition-colors ${viewMode === "table"
                    ? "bg-white shadow-sm text-gray-800"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                  onClick={() => setViewMode("table")}
                  disabled={isLoading}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                    ? "bg-white shadow-sm text-gray-800"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                  onClick={() => setViewMode("grid")}
                  disabled={isLoading}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>


          {/* Add New Button - Always visible */}
          <div className="flex-shrink-0">
            {isLoading ? (
              <Skeleton className="h-10 w-24 rounded-lg" />
            ) : (
              onAdd && (
                <Button
                  className="bg-[#37125d] text-white"
                  size="md"
                  onPress={() => onAdd(type)}
                  isDisabled={isLoading}
                >
                  Create {type}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Mobile-only Search Bar */}
        {isSearch && (
          <div className="sm:hidden w-full">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                isClearable
                className="w-full"
                placeholder="Search..."
                startContent={<Search className="w-5 h-5 text-default-400" />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
                isDisabled={isLoading}
              />
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 w-full rounded-lg">
          {isLoading ? (
            // Show skeleton filters
            <>
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-36" />
            </>
          ) : (
            // Show actual filters
            <>
              {filters.length > 0 && (
                filters.map((filter) => (
                  <CustomDropdown
                    key={filter.uid}
                    options={filter.content.map(option => ({
                      key: option.uid,
                      label: option.name,
                    }))}
                    placeholder={filter.name}
                    onSelectionChange={(key) => handleFilterChange(filter.uid, key)}
                    buttonClassName="w-full sm:w-[200px] justify-between truncate bg-gray-50 text-small"
                    dropdownClassName="w-full sm:w-[200px]"
                    matchWidth={true}
                    showSearch={filter.showSearch || false}
                    isDisabled={isLoading}
                  />
                ))
              )}

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
            </>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    activeFilters,
    onRowsPerPageChange,
    TableContent.length,
    onSearchChange,
    hasSearchFilter,
    statusOptions.length,
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
    onClear
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="pb-10 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-600">
          <div className="flex justify-between items-center">
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <label className="flex items-center text-gray-500 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-gray-600 text-small ml-2 border-2 border-gray-400 rounded-md px-2 py-1"
                  onChange={onRowsPerPageChange}
                  value={rowsPerPage}
                  disabled={isLoading}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            )}
          </div>
        </span>

        {isLoading ? (
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ) : (
    <Pagination
      isCompact
      showControls
      showShadow
      page={page}
      total={pages}
      onChange={setPage}
      isDisabled={isLoading}
      classNames={{
        cursor: "bg-[#37125d] text-white",
      }}
    />
        )}

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-12" />
            </>
          ) : (
            <>
              <Button
                isDisabled={pages === 1 || isLoading}
                size="sm"
                variant="bordered"
                className="bg-white"
                onPress={onPreviousPage}
              >
                <ChevronLeft size={16} />
              </Button>

              <Button
                isDisabled={pages === 1 || isLoading}
                size="sm"
                 variant="bordered"
                className="bg-white"
                onPress={onNextPage}
              >
                <ChevronRight size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter, isLoading, rowsPerPage, onRowsPerPageChange, onPreviousPage, onNextPage]);

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
                className={`h-4 rounded-md ${colIndex === 0
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

    if (sortedItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100"
          >
            <Grid3X3 className="h-12 w-12 text-gray-400" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-700">
            No {type}s Found
          </h3>
          <p className="max-w-sm text-center text-sm text-gray-500">
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
          {sortedItems.map((item, index) => (
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
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-between items-center bg-[#37125c] text-white px-4 py-2 rounded-md my-2"
        >
          <div className="flex items-center gap-4">
            <span>
              {selectedKeys === "all"
                ? `All ${filteredItems.length} items selected`
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            <button
              onClick={() => setSelectedKeys(new Set([]))}
              className="text-white underline text-sm hover:text-gray-300"
            >
              Clear Selection
            </button>
          </div>

          <div className="flex gap-3">
            <Button size="sm" variant="flat" className="bg-white text-black">
              Print Code
            </Button>
            <Button size="sm" color="danger">
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
            {/* Bottom content for grid view */}
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
            wrapper: "min-h-[400px] w-full mx-auto overflow-x-auto",
            table: "min-w-full",
          }}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          sortDescriptor={sortDescriptor}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
          onRowAction={handleRowAction}
          selectionBehavior={isSelectRows ? "toggle" : "replace"}
          checkboxesProps={{color:"warning"}}
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
            emptyContent={isLoading ? "" : "No data found"}
            items={isLoading ? [] : sortedItems}
          >
            {isLoading ? (
              generateSkeletonRows().map((skeletonRow) => skeletonRow)
            ) : (
              (item) => (
                <TableRow key={item.id || Math.random()}>
                  {(columnKey) => {
                    const col = columns.find((c) => c.headerId === columnKey);
                    return (
                      <TableCell>
                        {col?.render
                          ? col.render(item)
                          : defaultRenderCell(item, columnKey as string)}
                      </TableCell>
                    );
                  }}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
}