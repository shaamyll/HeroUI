import { useState } from 'react';
import TableComponent from '../components/Reusable/Table';
import { userData } from '../Data/User'

function Users() {
    const [users, setUsers] = useState([...userData.users]);

  
    const handleDeleteUser = (userId: number) => {
        const userIndex = userData.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            userData.users.splice(userIndex, 1);
        }
        
        // 2. Update React state to reflect the change
        setUsers([...userData.users]); 
    };

    const columns = [
        { name: 'ID', uid: 'id', sortable: true },
        { name: 'NAME', uid: 'name', sortable: true },
        { name: 'AGE', uid: 'age', sortable: true },
        { name: 'ROLE', uid: 'role', sortable: true },
        { name: 'TEAM', uid: 'team' },
        { name: 'EMAIL', uid: 'email' },
        { name: 'STATUS', uid: 'status', sortable: true },
        { name: 'ACTIONS', uid: 'actions' },
    ];

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

    const initialVisibleColumns = ["name", "role", "status", "actions","age","team","id"];

    return (
        <div className='min-h-screen'>
            <div className='mx-auto w-3/4 mt-15'>
                <h3 className='ms-auto text-2xl font-bold mb-5'>USERS TABLE :</h3>

                <TableComponent 
                    columns={columns}
                    data={users}
                    statusOptions={statusOptions}
                    statusColorMap={statusColorMap}
                    initialVisibleColumns={initialVisibleColumns}
                    onDelete={handleDeleteUser}
                />
            </div>
        </div>
    )
}

export default Users