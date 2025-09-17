import { useEffect, useState } from "react";
import TableComponent from "../components/Reusable/TableComponent";
import { Chip, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
const [categories,setCategories] = useState([])
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
        <div className="relative flex items-center gap-3">
          <Tooltip content="Details">
            <span className="cursor-pointer active:opacity-50">
              <Eye className="w-4 h-4" />
            </span>
          </Tooltip>
          <Tooltip content="Edit">
            <span className="cursor-pointer active:opacity-50">
              <PencilLine className="w-4 h-4" />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete">
            <span className="cursor-pointer active:opacity-50 text-danger">
              <Trash2 className="w-4 h-4" />
            </span>
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
  { name: "Category", uid: "category", content: categoryOptions },
];



  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/");
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
          type="project"
          TableContent={products}
          TableStructure={TableStructure}
          filters={filterContent}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItems={totalItems}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onAdd={handleAddClick}
          isSearch={true}
          isSelectRows={false}
        />
      </div>
    </div>
  );
}

export default Projects;
