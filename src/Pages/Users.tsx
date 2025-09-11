import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { userData } from '../Data/User';
import { addToast } from '@heroui/react';
import { motion } from 'framer-motion';

function Users() {
    const [users, setUsers] = useState([...userData.users]);

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

    // Add this new function to handle adding users
    const handleAddUser = useCallback((newUser: any) => {
        setUsers(prevUsers => {
            // Generate a new ID (in a real app, this would come from the backend)
            const newId = Math.max(...prevUsers.map(user => user.id), 0) + 1;

            // Create the complete user object with the new ID
            const userToAdd = {
                ...newUser,
                id: newId,
                status: newUser.status || 'active',
                role: newUser.role || 'Developer',
                team: newUser.team || "Development"
            };

            const updatedUsers = [...prevUsers, userToAdd];

            addToast({
                title: 'Success',
                description: `User ${newUser.name} has been added successfully.`,
                color: 'success',
                duration: 5000,
                isClosable: true,
            });

            return updatedUsers;
        });
    }, []);

    const headerData = [
        { name: 'ID', headerId: 'id', sortable: true },
        { name: 'Name', headerId: 'name', sortable: true },
        { name: 'Role', headerId: 'role', sortable: true },
        { name: 'Team', headerId: 'team', sortable: true },
        { name: 'Status', headerId: 'status', sortable: true },
        { name: 'Email', headerId: 'email', sortable: true },
        { name: 'Actions', headerId: 'actions', sortable: false }
    ]

    const statusOptions = [
        { name: 'Active', uid: 'active' },
        { name: 'Paused', uid: 'paused' },
        { uid: 'vacation' },
    ];

    const statusColorMap = {
        active: 'success',
        paused: 'danger',
        vacation: 'warning',
    };

    return (
        <div className='min-h-screen'>
            <div className='mx-auto w-3/4 mt-15'>
                <div className="w-full bg-purple-950 rounded-2xl p-6 mb-5">
                    <motion.h3
                        className="text-2xl font-bold text-white pb-10"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Users table :
                    </motion.h3>
                </div>

                <div>
                    <TableComponent
                        type="user"
                        headerData={headerData}
                        data={users}
                        statusOptions={statusOptions}
                        statusColorMap={statusColorMap}
                        onDelete={handleDeleteUser}
                        onEdit={handleEditUser}
                        onAdd={handleAddUser}
                        isSearch={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Users;