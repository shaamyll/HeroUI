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
} from "@heroui/react";
import { FolderOpen, Grid3X3, List, RotateCcw, Search, UsersRound } from "lucide-react";
import { motion } from "framer-motion";
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
    if (selected.size === 0) {
      setActiveFilters(prev => ({
        ...prev,
        [filterKey]: new Set()
      }));
      console.log(activeFilters)
    } else {
      // Set the new selection
      setActiveFilters(prev => ({
        ...prev,
        [filterKey]: selected
      }));
    }
    setPage(1);
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    const resetFilters: Record<string, Set<string>> = {};
    filters.forEach(filter => {
      resetFilters[filter.uid] = new Set();
    });
    setActiveFilters(resetFilters);
    setPage(1);
    setFilterValue("");
  }, [filters]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 my-4">
        {/* Top Row: Title and Add New (mobile) or Title, Search, Add New (desktop) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Title */}
          <div className="bg-gradient-to-r from-[#37125d] to-[#5a2d8a] rounded-lg px-3 py-5 shadow-lg flex items-center gap-2 border border-[#37125d]/20 h-[42px]">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <UsersRound className="h-4 w-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <h2 className="text-md font-semibold text-white">{type}s</h2>
              <span className="text-white/80 text-sm">({TableContent.length})</span>
            </div>
          </div>

          {/* Desktop-only Search Bar */}
          <div className="hidden sm:flex flex-grow">
            {isSearch ? (
              <Input
                size="md"
                isClearable
                classNames={{
                  base: "w-full",
                  inputWrapper: "font-extrabold py-5",
                  input: "placeholder:text-gray-400 placeholder:font-semibold"
                }}
                placeholder={`Search ${type}s..`}
                startContent={<Search className="w-4 h-4 text-default-400" />}
                value={filterValue}
                variant="faded"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
                isDisabled={isLoading}
              />
            ) : (
              <div className="min-h-[2.5rem]" />
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-0 bg-gray-100 rounded-lg px-1.5 py-1 shadow-sm">
            <Tabs
              aria-label="View mode"
              selectedKey={viewMode}
              onSelectionChange={(key) => setViewMode(key as "table" | "grid")}
              variant="solid"
              classNames={{
                tabList: "gap-0 p-0 ",
                cursor: "",
                tab: "p-2 rounded-sm",
                tabContent: "hover:text-gray-600"
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

          {/* Add New Button - Always visible */}
          <div className="flex-shrink-0">
            {onAdd && (
              <Button
                className="bg-gradient-to-r from-[#37125d] to-[#5a2d8a] text-white font-semibold"
                size="md"
                onPress={() => onAdd(type)}
                isDisabled={isLoading}
              >
                Create {type}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile-only Search Bar */}
        {isSearch && (
          <div className="sm:hidden w-full">
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
          </div>
        )}

        <div className="flex flex-wrap gap-3 w-full rounded-lg">
          {filters.length > 0 && (
            filters.map((filter) => (
              <CustomDropdown
                key={`${filter.uid}-${Object.keys(activeFilters).length}`}
                options={filter.content.map(option => ({
                  value: option.uid,  
                  label: option.name,
                }))}
                value={activeFilters[filter.uid] || ""}  
                placeholder={filter.name}
                onChange={(val) => handleFilterChange(filter.uid, val)}  
                buttonClassName="w-full sm:w-[200px] justify-between truncate bg-gray-50 text-small"
                dropdownClassName="w-full sm:w-[200px]"
                matchWidth
                showSearch={filter.showSearch || false}
                disabled={isLoading}
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
      <div className="pb-10 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
        {/* Rows per page */}
        <div className="flex justify-between items-center w-full sm:w-auto text-sm text-gray-600">
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <>
              <span className="font-medium text-gray-500">Rows per page:</span>
              <select
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ml-2"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
                disabled={isLoading}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center w-full sm:w-auto">
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
          transition={{ duration: 1.5, ease: "easeOut" }}
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
            wrapper: "min-h-[500px] w-full mx-auto overflow-x-auto",
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
          checkboxesProps={{ color: "default" }}
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
            items={isLoading ? [] : sortedItems}
          >
            {isLoading ? (
              generateSkeletonRows().map((skeletonRow) => skeletonRow)
            ) : (
              sortedItems.map((item, index) => (
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
                            delay: index * 0.08, // Slightly faster stagger
                            ease: [0.25, 0.46, 0.45, 0.94] // Custom smooth easing
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