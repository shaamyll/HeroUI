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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from "@heroui/react";
import { ChevronDown, Search } from "lucide-react";
import AddNew from "./AddNew";
import { motion } from "framer-motion";

export interface TableColumn {
  render?: (item: any) => React.ReactNode;
  name: string;
  headerId: string;
  sortable?: boolean;
  isSelectRows: boolean
}

export interface TableData {
  [key: string]: any;
}


interface TableComponentProps {
  data: TableData[];
  headerData?: Array<{ name: string; headerId: string; sortable?: boolean }>;
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
  data,
  headerData = [],
  statusOptions = [],
  filters = [],
  onAdd,
  type,
  isSearch,
  isSelectRows
}: TableComponentProps) {
  console.log(headerData)

  //  headerData for columns Headers
  const columns = React.useMemo<TableColumn[]>((): any => {
    return headerData.map(col => ({
      name: col.name,
      headerId: col.headerId,
      render: col.render,
      sortable: col.sortable || false,
    }));
  }, [headerData]);


  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string;
    direction: 'ascending' | 'descending';
  }>({
    column: columns[0]?.headerId || "id",
    direction: "ascending" as const,
  });
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredData = [...data];
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredData = filteredData.filter((item) =>
        ('status' in item && Array.from(statusFilter).includes(item.status)) ||
        ('projectStatus' in item && Array.from(statusFilter).includes(item.projectStatus))
      );
    }
    return filteredData;
  }, [data, filterValue, statusFilter, statusOptions.length]);

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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 my-4">
        <div className="flex justify-between gap-3 items-end">
          {isSearch ? (
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search..."
              startContent={<Search className="w-5 h-5 text-default-400" />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          ) : (
            // Placeholder to maintain layout
            <div className="w-full sm:max-w-[44%]" />
          )}
          <div className="flex gap-3">
            {filters.length > 0 && (
              filters.map((filter) => (
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<ChevronDown className="w-4 h-4" />} variant="faded">
                      {filter.name}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Status Filter"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {filter.content.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ))
            )}
            {/* Add new Data to Table */}
            <AddNew type={type} onSubmit={onAdd} />
          </div>
        </div>

      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    data.length,
    onSearchChange,
    hasSearchFilter,
    statusOptions.length,
    rowsPerPage,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-8 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-600">
        <div className="flex justify-between items-center">
          {/* <span className="text-default-400 text-small">Total {data.length} items</span> */}
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
          className="flex justify-between items-center bg-[#37125c] text-white px-4 py-3 rounded-md my-2"
        >
          <span>
            {selectedKeys === "all"
              ? `All ${filteredItems.length} items selected`
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <div className="flex gap-3">
            <Button size="sm" variant="flat" className="bg-white text-black">
              Print Code
            </Button>
            <Button size="sm" color="danger">
              Delete Selected
            </Button>
            <Button
              size="sm"
              variant="light"
              onPress={() => setSelectedKeys(new Set([]))}
              className="underline"
            >
              Clear Selection
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
          tr: isSelectRows ? "cursor-pointer hover:bg-gray-50" : "",
        }}
        selectionMode={isSelectRows ? "multiple" : "none"}
        selectedKeys={isSelectRows ? selectedKeys : undefined}
        onSelectionChange={isSelectRows ? setSelectedKeys : undefined}
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
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