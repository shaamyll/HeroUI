import React, { useState } from "react";
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
  Chip,
  Pagination,
  useDisclosure,
} from "@heroui/react";
import { ChevronDown, Plus, Search, ShieldCheck, ShieldX } from "lucide-react";
import TableActions from "./TableActions";
import AddNew from "./AddNew";
import { motion } from "framer-motion";

export interface TableColumn {
  render: TableColumn | undefined;
  name: string;
  uid: string;
  sortable?: boolean;
}

export interface TableData {
  [key: string]: any;
}

// Helper function to generate columns from data
const generateColumnsFromData = (data: TableData[]): TableColumn[] => {
  if (!data || data.length === 0) return [];

  // Get all unique keys from the data
  const allKeys = new Set();
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      allKeys.add(key);
    });
  });

  // Convert keys to column titles
  const dataColumns = Array.from(allKeys).map(key => ({
    name: key.split(/(?=[A-Z])/).join(' ').toUpperCase(),
    uid: key,
    sortable: true
  }));

  // Add index and actions columns
  return [
    ...dataColumns,
    {
      name: "ACTIONS",
      uid: "actions",
      sortable: false
    }
  ];
};

interface TableComponentProps {
  data: TableData[];
  statusOptions?: Array<{ name: string; uid: string }>;
  statusColorMap?: Record<string, string>;
  onStatusChange?: (id: number, isActive: boolean) => void;
  onDelete?: (id: number) => void;
  onEdit?: (data: any) => void;
  onAdd?: (data: any) => void;
  type?: 'user' | 'project';
  isSearch: Boolean
}

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export default function TableComponent({
  data,
  statusOptions = [],
  statusColorMap = {},
  onStatusChange,
  onDelete,
  onEdit,
  onAdd,
  type,
  isSearch
}: TableComponentProps) {

  // Generate columns from data
  const columns = React.useMemo(() => {
    return generateColumnsFromData(data);
  }, [data]);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: columns[0]?.uid || "id",
    direction: "ascending",
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

  const gradients = [
    "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "bg-gradient-to-r from-green-400 to-blue-500",
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-orange-400 to-pink-500",
  ];

  function getGradientFromName(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  }

  const handleStatusChange = (id: number, isActive: boolean) => {
    if (onStatusChange) {
      onStatusChange(id, isActive);
    }
  };
  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
      case "name":
        const bgColor = getGradientFromName(item.name || 'Unknown');
        return (
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${bgColor} text-white text-lg font-bold`}>
              {(item.name || 'U').charAt(0)}
            </div>
            <span className="font-medium">{cellValue}</span>
          </div>
        );
      case "assignedUser":
        const assignedUser = cellValue || { name: 'Unassigned' };
        return (
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-medium">{assignedUser.name}</span>
            </div>
          </div>
        )
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{item.team}</p>
          </div>
        );
      case "status":
      case "projectStatus":
        const status = columnKey === 'status' ? item.status : item.projectStatus;
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[status as keyof typeof statusColorMap] || "default"}
            size="sm"
            variant="flat"
          >
            {status}
          </Chip>
        );
      case "isActive":
        return (
          <div className="flex items-center">
            {item.isActive ? (
              <ShieldCheck
                className="h-6 w-6 cursor-pointer text-green-500 bg-green-100 rounded-lg p-1 shadow-sm transition-colors"
                onClick={() => handleStatusChange(item.id, false)}
              />
            ) : (
              <ShieldX
                className="h-6 w-6 cursor-pointer text-red-500 bg-red-100 rounded-lg p-1 shadow-sm transition-colors"
                onClick={() => handleStatusChange(item.id, true)}
              />
            )}
          </div>

        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <TableActions item={item} onDelete={onDelete} onEdit={onEdit} type={type || 'user'} />
          </div>
        );
      default:
        return typeof cellValue === 'object' && cellValue !== null
          ? (cellValue.name || JSON.stringify(cellValue))
          : cellValue;
    }
  }, [statusColorMap, onStatusChange, onDelete, onEdit, type]);

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

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
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
      <div className="flex flex-col gap-4">
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
            {statusOptions.length > 0 && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDown className="w-4 h-4" />} variant="faded">
                    Status
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
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {/* Add new Data to Table */}
            <AddNew type={type} onSubmit={onAdd} />
          </div>

        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {data.length} items</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
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
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-600">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Table
        isHeaderSticky
        aria-label="Dynamic table with all columns"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[500px] min-h-[300px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No data found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id || Math.random()}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}