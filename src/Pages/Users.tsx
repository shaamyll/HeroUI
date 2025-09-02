import TableComponent from '../components/Reusable/Table';

function Users() {

 const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    email: "brian.kim@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    email: "emma.adams@example.com",
  },
];

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
                />
            </div>
        </div>
    )
}

export default Users