import { useEffect, useState } from "react";
import TableComponent from "../../components/Reusable/DynamicTable";
import { Chip, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageCard from "../../components/Reusable/ImageCard";
import { assetResponse } from "@/components/lib/AssetData";
import DynamicTable from "../../components/Reusable/DynamicTable";

function Asset() {
    const [assets, setAssets] = useState<any[]>([]);
    const [page, setPage] = useState(3);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(3);
    const [isLoading, setIsLoading] = useState(true);

    // server-side state
    const [sortDescriptor, setSortDescriptor] = useState<any>(null);


    useEffect(() => {
        setIsLoading(true);
        const allAssets = assetResponse.data.data;
        setAssets(allAssets);
        setTotalItems(assetResponse.data.totalItems);
        setIsLoading(false);
    }, []);

    const renderStatus = (item: any) => {
        let color: "success" | "danger" | "warning" | "default" = "default";
        switch (item.status) {
            case "active": color = "success"; break;
            case "inactive": color = "danger"; break;
            case "in_maintenance": color = "warning"; break;
            case "not_in_use": color = "default"; break;
        }
        return (
            <Chip color={color} size="sm" variant="flat" classNames={{
                content: "font-semibold capitalize",
            }}>
                {item.status.replace(/_/g, " ")}
            </Chip>
        );
    };


    const TableStructure = [
        {
            name: "Asset Name",
            headerId: "name",
            sortable: true,
            render: (item: any) => (
                <span className="font-medium text-gray-800">{item.name}</span>
            ),
        },
        {
            name: "Asset Code",
            headerId: "code",
            sortable: true,
            render: (item: any) => (
                <span className="text-sm font-medium text-gray-800">{item.code}</span>
            ),
        },
        {
            name: "Status",
            headerId: "status",
            sortable: true,
            render: renderStatus
        },
        {
            name: "Category",
            headerId: "category",
            sortable: true,
            render: (item: any) => (
                <span className="text-gray-800 font-medium">{item.category?.name}</span>
            ),
        },
        {
            name: "Store",
            headerId: "store",
            sortable: false,
            render: (item: any) =>
                item.store ? (
                    <span className="text-gray-800 font-medium">
                        {item.store.store_name} ({item.store.store_code})
                    </span>
                ) : (
                    <span className="text-gray-800 font-medium">N/A</span>
                ),
        },
        {
            name: "Actions",
            headerId: "actions",
            sortable: false,
            render: (item:any) => (
                <div className="flex items-center gap-3">
                    <Tooltip content="Details">
                        <button className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-700 hover:bg-gray-200 active:opacity-70">
                            <Eye className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    <Tooltip content="Edit Asset">
                        <button className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-700 hover:bg-gray-200 active:opacity-70"
                         onClick={()=>handleEditAsset(item.id)}>
                            <SquarePen className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    <Tooltip color="danger" content="Delete Asset">
                        <button className="flex items-center justify-center w-7 h-7 rounded-lg text-red-600 hover:bg-red-200 active:opacity-70">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];


    const categoryOptions = [
        ...new Set(assets.map((a) => a.category?.name).filter(Boolean))
    ].map((cat) => ({ name: cat, uid: cat }));

    console.log(categoryOptions)

    const statusOptions = [
        { name: "Active", uid: "22" },
        { name: "Inactive", uid: "in_active" },
        { name: "In Maintenance", uid: "in_maintenance" },
        { name: "Not in Use", uid: "not_in_use" },
    ];

    const filterContent = [
        { name: "Category", uid: "category", content: categoryOptions, showSearch: true },
        { name: "Status", uid: "status", content: statusOptions, showSearch: false, dependsOn: 'category' },
    ];

    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate("/create-asset");
    };

    const handleEditAsset = (assetId: string) => {
  navigate(`/edit-asset/${assetId}`); 
};

    const AssetCard = ({ item }: any) => (
        <ImageCard
            imageAlt={item.name}
            title={item.name}
            subtitle={item.category?.name}
            description={`Code: ${item.code} | Value: ₹${item.depreciation?.current_value || "-"
                }`}
            item={item}
        />
    );


    return (
        <div className="min-h-screen mx-2">
            <div className="max-w-[1400px] mx-auto mt-5">
                <div className="w-full bg-purple-950 rounded-2xl p-6">
                    <motion.h3
                        className="text-2xl font-bold text-white pb-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Asset Table
                    </motion.h3>
                </div>
                <DynamicTable
                    type="Asset"
                    TableContent={assets}
                    TableStructure={TableStructure}
                    searchPlaceholder="Search by Asset name..."
                    CardComponent={AssetCard}
                    filters={filterContent}
                    onFiltersChange={
                        (val) => {
                            console.log("parent", val)
                        }
                    }
                    onSearchValueChange={(val: any) => {
                        console.log("parent", val)
                    }
                    }
                    onSortChange={(sortDesc) => {
                        console.log("Sort changed:", sortDesc);
                        setSortDescriptor(sortDesc);
                    }}
                    onPageChange={(newPage) => {
                        console.log("Page changed:", newPage);
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={(newRowsPerPage) => {
                        console.log("Rows per page changed:", newRowsPerPage);
                        setRowsPerPage(newRowsPerPage);
                        setPage(1); // Reset to first page
                    }}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalItems={totalItems}
                    totalPages={totalPages}
                    onAdd={handleAddClick}
                    isSearch={true}
                    isSelectRows={true}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

export default Asset;
