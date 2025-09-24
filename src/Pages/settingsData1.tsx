import { useCallback, useState } from 'react';
import DynamicTable from '../components/Reusable/DynamicTable';
import { userData } from '../Data/User';
import { addToast, Chip, Tooltip } from '@heroui/react';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import DeleteModal from '../components/Reusable/DeleteModal';
import { useNavigate } from 'react-router-dom';
import UserCard from '@/components/Reusable/UserCard';


function Users() {
    const [users, setUsers] = useState([...userData.users]);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // ✅ Delete User
    const handleDeleteUser = useCallback((id: number) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => user.id !== id);
            addToast({
                title: 'Deleted',
                description: `User with ID ${id} has been deleted successfully.`,
                color: 'danger',
                duration: 5000,
                isClosable: true,
            });
            return updatedUsers;
        });
    }, []);

    // ✅ Trigger modal instead of deleting immediately
    const openDeleteModal = (user: any) => {
        setSelectedUser(user);
        setIsDeleteOpen(true);
    };

    // ✅ Confirm from modal → call parent delete
    const confirmDelete = () => {
        if (selectedUser) {
            handleDeleteUser(selectedUser.id);
        }
        setIsDeleteOpen(false);
    };

    // 🎨 Gradient colors
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

    const statusColorMap = {
        active: 'success',
        paused: 'danger',
        vacation: 'warning',
    } as const;

    type UserStatus = keyof typeof statusColorMap;
const TableStructure = [
    { 
        name: 'ID', 
        headerId: 'id', 
        sortable: true,
        render: (item: any) => <span>{item.id}</span>
    },
{
  name: 'Name',
  headerId: 'name',
  sortable: true,
  render: (item: any) => {
    const isLong = item.name.length > 20;

    const nameText = (
      <span className="truncate block max-w-[160px]">{item.name}</span>
    );

    return (
      <div className="flex items-center gap-3 max-w-[220px]">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md ${getGradientFromName(
            item.name
          )}`}
        >
          {item.name.charAt(0).toUpperCase()}
        </div>
        {isLong ? (
          <Tooltip content={item.name}>{nameText}</Tooltip>
        ) : (
          nameText
        )}
      </div>
    );
  },
}
,
    {
        name: 'Role',
        headerId: 'role',
        sortable: true,
        render: (item: any) => (
            <p className="text-bold text-small">{item.role}</p>
        ),
    },
    { 
        name: 'Team', 
        headerId: 'team', 
        sortable: true,
        render: (item: any) => <span>{item.team}</span>
    },
    {
        name: 'Status',
        headerId: 'status',
        sortable: true,
        render: (item: any) => (
            <Chip color={statusColorMap[item.status as UserStatus]} size="sm" variant="flat">
                {item.status}
            </Chip>
        ),
    },
    { 
        name: 'Email', 
        headerId: 'email', 
        sortable: true,
        render: (item: any) => <span>{item.email}</span>
    },
    {
        name: 'Actions',
        headerId: 'actions',
        sortable: false,
        render: (item: any) => (
            <div className="flex items-center gap-3">
                {/* View Button */}
                <Tooltip content="Details">
                    <button className="flex items-center justify-center w-7 h-7 rounded-lg  bg-blue-50 text-gray-600 hover:bg-blue-100 active:opacity-70">
                        <Eye className="w-4 h-4" />
                    </button>
                </Tooltip>

                {/* Edit Button */}
                <Tooltip content="Edit user">
                    <button className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-25 text-gray-600 hover:bg-green-100  active:opacity-70">
                        <SquarePen className="w-4 h-4" />
                    </button>
                </Tooltip>

                {/* Delete Button */}
                <Tooltip color="danger" content="Delete user">
                    <button
                        onClick={() => {
                            console.log("Deleting user:", item);
                            openDeleteModal(item);
                        }}
                        className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 active:opacity-70"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </Tooltip>
            </div>
        ),
    },
];



    const roleOptions = [
        { name: 'Developer', uid: 'dev7eloper' },
        { name: 'Tester', uid: 'tester' },
        { name: 'Manager', uid: 'manager' },
    ];

    const teamOptions = [
        { name: 'Development', uid: 'development' },
        { name: 'Testing', uid: 'testing' },
        { name: 'Management', uid: 'management' },
    ];

    const statusOptions = [
        { name: 'Active', uid: 'active' },
        { name: 'Paused', uid: 'paused' },
        { name: 'Vacation', uid: 'vacation' },
    ];

    const filterContent = [
        { name: 'Status', uid: 'status', content: statusOptions, showSearch: false },
        { name: 'Role', uid: 'role', content: roleOptions, showSearch: true },
        { name: 'Team', uid: 'team', content: teamOptions, showSearch: false },
    ];

    const navigate = useNavigate()

    const handleAddClick = (type: string) => {
        navigate(`/add-${type}`);
    };

    // ✅ Wrapper for DynamicCard
    const UserCardWrapper = ({ item }: any) => (
        <UserCard
            item={item}
            onView={(user) => console.log("View", user)}
            onDelete={openDeleteModal}
        />
    )

    return (
        <div className="min-h-screen mx-2">
            <div className="max-w-[1400px] mx-auto mt-6">
                {/* Header */}
                {/* <div className="w-full bg-[#37125d] rounded-2xl p-6 mb-5">
                    <motion.h3
                        className="text-2xl font-bold text-white pb-10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    > */}
                        {/* Users Table :
                    </motion.h3> */}
                    {/* <CustomDropdown/> */}
                {/* </div> */}

                {/* Table */}
                <DynamicTable
                    type="User"
                    TableStructure={TableStructure}
                    TableContent={users}
                    searchPlaceholder="search by asset name..."
                    CardComponent={UserCardWrapper}
                    filters={filterContent}
                    onDelete={handleDeleteUser}
                    onAdd={handleAddClick}
                    isSearch={true}
                    isSelectRows={true}
                    onFiltersChange={
                        (val)=>{
                            console.log("parent",val)
                        }
                    }
                    onSearchValueChange={(val:any)=>{
                        console.log("parent",val)
                    }
                    }
                />
            </div>
            {/* Delete Modal controlled from parent */}
            <DeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                itemName={selectedUser?.name || ""}
            />
        </div>
    );
}

export default Users;
