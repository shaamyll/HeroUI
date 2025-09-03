import { useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { userData } from '../Data/User';
import { addToast } from '@heroui/react';

function Users() {
    const [users, setUsers] = useState([...userData.users]);

  
    const handleDeleteUser = (userId: number) => {
        const userIndex = userData.users.findIndex(user => user.id === userId);
        let userName = '';
        
        if (userIndex !== -1) {
            const deletedUser = userData.users[userIndex];
            userName = deletedUser.name || 'User';
            userData.users.splice(userIndex, 1);
            
            // Show success toast
            addToast({
                title: 'Success',
                description: `${userName} has been deleted successfully`,
                color: 'success',
            });
        }
        
        // Update React state to reflect the change
        setUsers([...userData.users]); 
    };
    
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
                />
            </div>
        </div>
    )
}

export default Users