import { useEffect, useState } from "react";
import TableComponent from "../components/Reusable/TableComponent";
import { Chip, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageCard from "../components/Reusable/ImageCard";
import { assetResponse } from "@/components/lib/AssetData";

function Asset() {
    const [assets, setAssets] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // ✅ Load mock data (replace with API later if needed)
    useEffect(() => {
        setIsLoading(true);
        const allAssets = assetResponse.data.data;
        setAssets(allAssets);
        setTotalItems(assetResponse.data.totalItems);
        setIsLoading(false);
    }, []);

    const TableStructure = [
        {
            name: "Asset Name",
            headerId: "name",
            sortable: true,
            render: (item: any) => (
                <span className="font-medium text-gray-700">{item.name}</span>
            ),
        },
        {
            name: "Asset Code",
            headerId: "code",
            sortable: true,
            render: (item: any) => (
                <span className="text-sm font-medium text-gray-700">{item.code}</span>
            ),
        },
        {
            name: "Status",
            headerId: "status",
            sortable: true,
            render: (item: any) => {
                let color: "success" | "danger" | "warning" | "default" = "default";
                switch (item.status) {
                    case "active":
                        color = "success";
                        break;
                    case "inactive":
                        color = "danger";
                        break;
                    case "in_maintenance":
                        color = "warning";
                        break;
                    case "not_in_use":
                        color = "default";
                        break;
                }
                return (
                    <Chip color={color} size="sm" variant="flat" className="capitalize">
                        {item.status.replace(/_/g, " ")}
                    </Chip>
                );
            },
        },
        {
            name: "Category",
            headerId: "category",
            sortable: true,
            render: (item: any) => (
                <span className="text-gray-600 font-medium">{item.category?.name}</span>
            ),
        },
        {
            name: "Store",
            headerId: "store",
            sortable: false,
            render: (item: any) =>
                item.store ? (
                    <span className="text-gray-600 font-medium">
                        {item.store.store_name} ({item.store.store_code})
                    </span>
                ) : (
                    <span className="text-gray-400">No Store</span>
                ),
        },
        {
            name: "Tags",
            headerId: "tags",
            sortable: false,
            render: (item: any) => (
                <span className="text-gray-400">—</span>
            ),
        },
        {
            name: "Actions",
            headerId: "actions",
            sortable: false,
            render: () => (
                <div className="flex items-center gap-3">
                    <Tooltip content="Details">
                        <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-gray-700 hover:bg-gray-200 active:opacity-70">
                            <Eye className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    <Tooltip content="Edit Asset">
                        <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-gray-700 hover:bg-gray-200 active:opacity-70">
                            <SquarePen className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    <Tooltip color="danger" content="Delete Asset">
                        <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 active:opacity-70">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];


    // ✅ Filters (Category & Status)
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
        { name: "Status", uid: "status", content: statusOptions, showSearch: false },
    ];

    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate("/create-asset");
    };

    // ✅ Card view (Grid mode)
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
            <div className="max-w-[1400px] mx-auto mt-10">
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
                <TableComponent
                    type="Asset"
                    TableContent={assets}
                    TableStructure={TableStructure}
                    searchPlaceholder="Search by Asset name..."
                    CardComponent={AssetCard}
                    filters={filterContent}
                     onFiltersChange={
                        (val)=>{
                            console.log("parent",val)
                        }
                    }
                    onSearchValueChange={(val:any)=>{
                        console.log("parent",val)
                    }
                    }
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalItems={totalItems}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
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
