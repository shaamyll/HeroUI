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
} from "@heroui/react";
import { Grid3X3, List, RotateCcw, Search } from "lucide-react";
import AddNew from "./AddNew";
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

interface TableComponentProps {
  TableContent: TableContent[];
  TableStructure?: Array<{
    render: any; name: string; headerId: string; sortable?: boolean 
}>;
  statusOptions?: Array<{ name: string; uid: string }>;
  filters?: Array<{ name: string; uid: string; content: Array<{ name: string; uid: string }> }>;
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

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export default function TableComponent({
  TableContent,
  TableStructure = [],
  statusOptions = [],
  filters = [],
  onAdd,
  type,
  isSearch,
  isSelectRows
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

  const [viewMode, setViewMode] = useState('')
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
  }, [TableContent, filterValue, hasSearchFilter, activeFilters]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
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
  }, [sortDescriptor, items]);

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
          {/* Title - Always visible */}
          <div className="bg-gray-100 sm:bg-gray-50 rounded-lg p-2 px-3 flex-shrink-0">
            <span className="font-medium">{type}s ({TableContent.length})</span>
          </div>

          {/* Desktop-only Search Bar */}
          <div className="hidden sm:flex flex-grow">
            {isSearch ? (
              <Input
                isClearable
                classNames={{
                  base: "w-full",
                  inputWrapper: "font-extrabold",
                }}
                placeholder="Search..."
                startContent={<Search className="w-5 h-5 text-default-400" />}
                value={filterValue}
                variant="faded"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
              />
            ) : (
              <div className="min-h-[2.5rem]" />
            )}
          </div>

          {/* View Toggle and Add New Button */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-800'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === 'grid'
                  ? 'bg-white shadow-sm text-gray-800'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add New Button - Always visible */}
          <div className="flex-shrink-0">
            <AddNew type={type} onSubmit={onAdd} />
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
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3 w-full">
          {filters.length > 0 && (
            filters.map((filter) => (
              <CustomDropdown
                key={filter.uid}
                items={filter.content.map(option => ({
                  key: option.uid,
                  label: option.name,
                  description: option.description
                }))}
                placeholder={filter.name}
                defaultselectedKeys={activeFilters[filter.uid]}
                onSelectionChange={(key:any) => handleFilterChange(filter.uid, key)}
                buttonClassName="w-full sm:w-[200px] justify-between truncate bg-gray-50 text-small"
                dropdownClassname="w-full sm:w-[200px]"
                matchWidth={true}
                disallowEmptySelection={false}
                isSearch={true}
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
  ]);


  const bottomContent = React.useMemo(() => {
    return (
      <div className="pb-10 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-600">
          <div className="flex justify-between items-center">
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small ml-2 border-1 border-[#d2d2d7] rounded-md px-2 py-1"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
              >
                {/* <option value="5">5</option> */}
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="faded" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="faded" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className=" w-full mx-auto"
    >
      {topContent}
      {/* Selection Action Bar directly above the table */}
      {isSelectRows && (selectedKeys === "all" || selectedKeys.size > 0) && (
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
        selectionBehavior={isSelectRows ? "selection" : "replace"}
        hideSelectionCheckbox={false} 
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.headerId}
              allowsSorting={column.sortable}
              className="text-sm"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody emptyContent={"No data found"} items={sortedItems}>
          {(item) => (
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
          )}
        </TableBody>

      </Table>
    </motion.div>
  );
}