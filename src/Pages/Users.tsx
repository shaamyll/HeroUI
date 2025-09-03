import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { userData } from '../Data/User';
import { addToast } from '@heroui/react';

function Users() {
    const [users, setUsers] = useState([...userData.users]);

    const handleDeleteUser = useCallback((id: number) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.filter(user => user.id !== id);
            addToast({
                title: 'Success',
                description: `User with ID ${id} has been deleted successfully.`,
                status: 'success',
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
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            return updatedUsers;
        });
    }, []);

    const statusOptions = [
        { name: 'Active', uid: 'active' },
        { name: 'Paused', uid: 'paused' },
        { name: 'Vacation', uid: 'vacation' },
    ];

    const statusColorMap = {
        active: 'success',
        paused: 'danger',
        vacation: 'warning',
    };

    return (
        <div className='min-h-screen'>
            <div className='mx-auto w-3/4 mt-15'>
                <h3 className='ms-auto text-2xl font-bold mb-5'>USERS TABLE :</h3>

                <TableComponent 
                    data={users}
                    statusOptions={statusOptions}
                    statusColorMap={statusColorMap}
                    onDelete={handleDeleteUser}
                    onEdit={handleEditUser}
                    isSearch={true}
                />
            </div>
        </div>
    )
}

export default Users