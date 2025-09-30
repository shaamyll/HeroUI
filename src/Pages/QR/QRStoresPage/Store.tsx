import React, { useState } from "react";
import { QRStoreCard } from "../../../components/QR/Stores/StoreModal";
import SearchableSelect from "@/components/Reusable/SearchableSelect";
import { Pagination } from "@heroui/pagination";
import { type PaginationItemRenderProps, PaginationItemType } from "@heroui/react";
import { cn } from "@heroui/react";
import CustomInput from "@/components/common/CustomInput";
import { Search, Plus, MapPinned } from "lucide-react";
import type { StoreData } from "../../../components/QR/Stores/StoreModal";


// Chevron Icon for Pagination
const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.5 19l-7-7 7-7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

const StoreManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [storeFilter, setStoreFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const itemsPerPage = 9;

  // Filter options for SearchableSelect
  const filterOptions = [
    { value: "all", label: "All Stores" },
    { value: "with_items", label: "Stores with Items" }
  ];

  // Temporary dummy data - will be replaced with API
  const allStores: StoreData[] = [
    {
      name: "Ishbiliyah-Al Sahaba Rd–3208",
      address: "The Coffee Address For Trading Company",
      slug: "demo",
      createdAt: "19 Apr 2025",
      avatarUrl: "/src/assets/logo.jpeg",
      isBlocked: false
    },
    {
      name: "Abha-Abu Hurairah - 5156",
      address: "The Coffee Address For Trading Company",
      slug: "5156-شارع-ابي-هريرة",
      createdAt: "19 Apr 2025",
      avatarUrl: "/src/assets/ADDRESSCOFFE1.jpg",
      isBlocked: false
    },
    {
      name: "Abha-Al Mahdiah-5078",
      address: "The Coffee Address For Trading Company",
      slug: "5078-المهدية-شارع-عزيز-ضياء",
      createdAt: "19 Apr 2025",
      avatarUrl: "/src/assets/logo.jpeg",
      isBlocked: false
    },
    {
      name: "Abha-Buroq-5210",
      address: "The Coffee Address For Trading Company",
      slug: "Abha-Buroq-5210",
      createdAt: "23 May 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      isBlocked: false
    },
    {
      name: "Abha-Prince sultan Rd-Riyadh Rd-5152",
      address: "The Coffee Address For Trading Company",
      slug: "5152-طريق-الامير-سلطان-طريق-عمر-الأنصاري-شمالا",
      createdAt: "19 Apr 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      isBlocked: false
    },
    {
      name: "Abha, Khamis Mushait-5085",
      address: "The Coffee Address For Trading Company",
      slug: "5085-خميس-مشيط-الراقي-الامير-سلطان",
      createdAt: "19 Apr 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
      isBlocked: false
    },
    {
      name: "Ahmodya-1026",
      address: "The Coffee Address For Trading Company",
      slug: "1026-الأحمدية-طريق-الإمير-نايف-بن-عبدالعزيز",
      createdAt: "19 Apr 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=7",
      isBlocked: false
    },
    {
      name: "Ahsa-1025",
      address: "The Coffee Address For Trading Company",
      slug: "1025-الاحساء-طريق-الملك-عبدالله",
      createdAt: "19 Apr 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=8",
      isBlocked: false
    },
    {
      name: "Ahud Rafidah-Khamis Mushait-5206",
      address: "The Coffee Address For Trading Company",
      slug: "As Salamah, Ahud Rafidah-5206",
      createdAt: "19 Apr 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=9",
      isBlocked: false
    },
    {
      name: "Al-Suwaidi -Shokh Saleh Bin Abdulaziz St-5201",
      address: "The Coffee Address For Trading Company",
      slug: "5201-السويدي-شارع-شيخ-صالح",
      createdAt: "19 Apr 2025",
      avatarUrl: "https://i.pravatar.cc/150?img=10",
      isBlocked: false
    }
  ];

  // Filter stores based on search term
  const filteredStores = allStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStores = filteredStores.slice(startIndex, endIndex);

  // Handlers
  const handleQrCode = (store: StoreData) => {
    setSelectedStore(store);
    setShowQrModal(true);
    console.log("QR Code clicked for:", store.name);
  };

  const handleView = (store: StoreData) => {
    console.log("View clicked for:", store.name);
  };

  const handleEdit = (store: StoreData) => {
    console.log("Edit clicked for:", store.name);
  };

  const handleToggleStatus = (store: StoreData) => {
    console.log(`${store.name} status toggled`);
  };

  // Pagination render item
  const renderPaginationItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={onNext}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && "text-white bg-gradient-to-br from-orange-500 to-orange-600 font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen border border-orange-400 rounded-xl shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
          <MapPinned className="w-6 h-6 text-orange-500" />
          <span>Stores</span>
          <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
            {filteredStores.length}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
          {/* Filter Dropdown */}
          <div className="w-full sm:w-48">
            <SearchableSelect
              options={filterOptions}
              value={storeFilter}
              onChange={(value) => setStoreFilter(value)}
              placeholder="Filter stores..."
            />
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64">
            <CustomInput
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              startContent={<Search className="text-gray-400" size={18} />}
              classNames={{
                inputWrapper: "border-gray-300 focus-within:border-orange-500"
              }}
            />
          </div>

          {/* Add Store Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-sm transition h-10"
          >
            <Plus size={18} /> Add New Store
          </button>
        </div>
      </div>

      {/* Store Cards Grid */}
      <div className="bg-white rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {currentStores.map((store) => (
            <QRStoreCard
              key={store.slug}
              storeData={store}
              onQrCode={handleQrCode}
              onView={handleView}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {currentStores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No stores found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            disableCursorAnimation
            showControls
            className="gap-2"
            page={currentPage}
            total={totalPages}
            radius="full"
            renderItem={renderPaginationItem}
            variant="light"
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default StoreManagement;