import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { userData } from '../Data/User';
import { addToast, Chip, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Eye, PencilLine, Trash2 } from 'lucide-react';
import DeleteModal from '../components/Reusable/DeleteModal';
import { useNavigate } from 'react-router-dom';

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

    // ✅ Edit User
    const handleEditUser = useCallback((updatedUser: any) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user =>
                user.id === updatedUser.id ? { ...user, ...updatedUser } : user
            );
            addToast({
                title: 'Success',
                description: `User ${updatedUser.name} has been updated successfully.`,
                color: 'success',
                duration: 5000,
                isClosable: true,
            });
            return updatedUsers;
        });
    }, []);

    // ✅ Add User
    const handleAddUser = useCallback((newUser: any) => {
        setUsers(prevUsers => {
            const newId = Math.max(...prevUsers.map(user => user.id), 0) + 1;
            const userToAdd = {
                ...newUser,
                id: newId,
                status: newUser.status || 'active',
                role: newUser.role || 'Developer',
                team: newUser.team || 'Development',
            };

            const updatedUsers = [...prevUsers, userToAdd];

            addToast({
                title: 'Success',
                description: `User ${newUser.name} has been added successfully.`,
                color: 'success',
                isClosable: true,
                variant: 'flat',
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });

            return updatedUsers;
        });
    }, []);

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
        { name: 'ID', headerId: 'id', sortable: true },
        {
            name: 'Name',
            headerId: 'name',
            sortable: true,
            render: (item: any) => ( //cell customization
                <div className="flex items-center gap-3">
                    <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md ${getGradientFromName(
                            item.name
                        )}`}
                    >
                        {item.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="">{item.name}</span>
                </div>
            ),
        },
        {
            name: 'Role',
            headerId: 'role',
            sortable: true,
            render: (item: any) => (
                <p className="text-bold text-small">{item.role}</p>
            ),
        },
        { name: 'Team', headerId: 'team', sortable: true },
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
        { name: 'Email', headerId: 'email', sortable: true },
        {
            name: 'Actions',
            headerId: 'actions',
            sortable: false,
            render: (item: any) => (
                <div className="flex items-center gap-3">
                    {/* View Button */}
                    <Tooltip content="Details">
                        <button className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-50 text-gray-700 hover:bg-gray-200 active:opacity-70">
                            <Eye className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    {/* Edit Button */}
                    <Tooltip content="Edit user">
                        <button className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 active:opacity-70">
                            <PencilLine className="w-4 h-4" />
                        </button>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip color="danger" content="Delete user">
                        <button
                            onClick={() => {
                                console.log("Deleting user:", item);
                                openDeleteModal(item);
                            }}
                            className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 active:opacity-70"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </Tooltip>
                </div>

            ),
        },
    ];



    const roleOptions = [
        { name: 'Developer', uid: 'developer' },
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
        { name: 'Status', uid: 'status', content: statusOptions },
        { name: 'Role', uid: 'role', content: roleOptions },
        { name: 'Team', uid: 'team', content: teamOptions },
    ];

    const navigate = useNavigate()

    const handleAddClick = (type: string) => {
        navigate(`/add-${type}`);  
    };

    return (
        <div className="min-h-screen px-2">
            <div className="max-w-[1400px] mx-auto mt-10">
                {/* Header */}
                <div className="w-full bg-[#37125d] rounded-2xl p-6 mb-5">
                    <motion.h3
                        className="text-2xl font-bold text-white pb-10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        Users Table :
                    </motion.h3>
                    {/* <CustomDropdown/> */}
                </div>

                {/* Table */}
                <TableComponent
                    type="user"
                    TableStructure={TableStructure}
                    TableContent={users}
                    filters={filterContent}
                    onDelete={handleDeleteUser}
                    onEdit={handleEditUser}
                    onAdd={handleAddClick}
                    isSearch={true}
                    isSelectRows={true}
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
