import { useEffect, useState } from "react";
import TableComponent from "../components/Reusable/TableComponent";
import { Chip, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageCard from "../components/Reusable/ImageCard";

function Projects() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  // ✅ Fetch products for the current page
  useEffect(() => {
    fetch(
      `https://fakestoreapi.com/products?limit=${rowsPerPage}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Fakestore doesn’t return total count, so assume 20 for demo
        setTotalItems(20);
        setIsLoading(false);
      });
  }, [page, rowsPerPage]);


  console.log(categories)


  const TableStructure = [
    { name: "ID", headerId: "id", sortable: true },
    {
      name: "Title",
      headerId: "title",
      sortable: true,
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-10 h-10 rounded"
          />
          <span>{item.title}</span>
        </div>
      ),
    },
    { name: "Category", headerId: "category", sortable: true },
    {
      name: "Price",
      headerId: "price",
      sortable: true,
      render: (item: any) => (
        <Chip color="success" size="sm" variant="flat">
          ${item.price}
        </Chip>
      ),
    },
    {
      name: "Actions",
      headerId: "actions",
      sortable: false,
      render: () => (
        <div className="flex items-center gap-3">
          {/* View Button */}
          <Tooltip content="Details">
            <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-gray-700 hover:bg-gray-200 active:opacity-70">
              <Eye className="w-4 h-4" />
            </button>
          </Tooltip>

          {/* Edit Button */}
          <Tooltip content="Edit user">
            <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-gray-700 hover:bg-gray-200 active:opacity-70">
              <PencilLine className="w-4 h-4" />
            </button>
          </Tooltip>

          {/* Delete Button */}
          <Tooltip color="danger" content="Delete user">
            <button
              onClick={() => {
                console.log("Deleting user:");

              }}
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 active:opacity-70"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];


  const categoryOptions = [
    { name: "Electronics", uid: "electronics" },
    { name: "Jewelery", uid: "jewelery" },
    { name: "Men's clothing", uid: "men's clothing" },
    { name: "Women's clothing", uid: "women's clothing" },
  ];

  const filterContent = [
    { name: "Select Category", uid: "category", content: categoryOptions, showSearch: false },
  ];

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/");
  };


  // Create a wrapper for the ImageCard
  const ProductCard = ({ item, onView, onEdit, onDelete }: any) => (
    <ImageCard
      imageSrc={item.image}
      imageAlt={item.title}
      title={item.title}
      subtitle={item.category}
      description={`$${item.price}`}
      item={item}
    />
  );

  // callback from TableComponent
  const handleFiltersChange = (filters: { uid: string; values: { value: string; label: string }[] }[]) => {
    console.log("Filters from table:", filters);
  };


  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto mt-10">
        <div className="w-full bg-purple-950 rounded-2xl p-6 ">
          <motion.h3
            className="text-2xl font-bold text-white pb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Projects Table :
          </motion.h3>
        </div>
        <TableComponent
          type="Project"
          TableContent={products}
          TableStructure={TableStructure}
          CardComponent={ProductCard}
          filters={filterContent}
          onFiltersChange={handleFiltersChange}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItems={totalItems}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onAdd={handleAddClick}
          isSearch={true}
          isSelectRows={false}
          isLoading={isLoading}
          onFiltersChange={
            (val) => {
              console.log("parent", val)
            }
          }
          onSearchValueChange={(val: any) => {
            console.log("parent", val)
          }
          }
        />
      </div>
    </div>
  );
}

export default Projects;
