import React from 'react';
import TableComponent from '../components/Reusable/Table';

function Projects() {

 const projects = [
  {
    id: 1,
    projectName: "Website Redesign",
    assignedUser: {
      name: "Zoey Lang",
      id: 2,
    },
    timePeriod: "Q3 2024",
    projectStatus: "In Progress",
    projectDifficulty: "Medium",
  },
  {
    id: 2,
    projectName: "Mobile App Development",
    assignedUser: {
      name: "Jane Fisher",
      id: 3,
    },
    timePeriod: "Q4 2024",
    projectStatus: "On Hold",
    projectDifficulty: "Hard",
  },
  {
    id: 3,
    projectName: "Marketing Campaign Launch",
    assignedUser: {
      name: "William Howard",
      id: 4,
    },
    timePeriod: "Q3 2024",
    projectStatus: "Completed",
    projectDifficulty: "Easy",
  },
  {
    id: 4,
    projectName: "New Server Migration",
    assignedUser: {
      name: "Tony Reichert",
      id: 1,
    },
    timePeriod: "Q1 2025",
    projectStatus: "In Progress",
    projectDifficulty: "Hard",
  },
  {
    id: 5,
    projectName: "Internal HR System Update",
    assignedUser: {
      name: "Samantha Brooks",
      id: 8,
    },
    timePeriod: "Q2 2025",
    projectStatus: "Completed",
    projectDifficulty: "Medium",
  },
  {
    id: 6,
    projectName: "Customer Support System",
    assignedUser: {
      name: "Kristen Copper",
      id: 5,
    },
    timePeriod: "Q3 2024",
    projectStatus: "Completed",
    projectDifficulty: "Medium",
  },
  {
    id: 7,
    projectName: "Brand Guideline Creation",
    assignedUser: {
      name: "Michael Hunt",
      id: 7,
    },
    timePeriod: "Q4 2024",
    projectStatus: "In Progress",
    projectDifficulty: "Easy",
  },
  {
    id: 8,
    projectName: "Financial Audit",
    assignedUser: {
      name: "Frank Harrison",
      id: 9,
    },
    timePeriod: "Q1 2025",
    projectStatus: "On Hold",
    projectDifficulty: "Hard",
  },
  {
    id: 9,
    projectName: "New Product Launch",
    assignedUser: {
      name: "Emma Adams",
      id: 10,
    },
    timePeriod: "Q2 2025",
    projectStatus: "In Progress",
    projectDifficulty: "Hard",
  },
  {
    id: 10,
    projectName: "Internal Wiki Development",
    assignedUser: {
      name: "Brian Kim",
      id: 6,
    },
    timePeriod: "Q3 2025",
    projectStatus: "Completed",
    projectDifficulty: "Medium",
  },
];


  const columns = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'PROJECT NAME', uid: 'projectName', sortable: true },
    { name: 'ASSIGNED TO', uid: 'assignedUser', sortable: true },
    { name: 'TIME PERIOD', uid: 'timePeriod' },
    { name: 'STATUS', uid: 'projectStatus', sortable: true },
    { name: 'DIFFICULTY', uid: 'projectDifficulty' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const statusOptions = [
    { name: 'In Progress', uid: 'In Progress' },
    { name: 'On Hold', uid: 'On Hold' },
    { name: 'Completed', uid: 'Completed' },
  ];

  const statusColorMap = {
    'In Progress': 'primary',
    'On Hold': 'warning',
    'Completed': 'success',
  };

  const initialVisibleColumns = ["projectName", "id", "projectStatus", "projectDifficulty", "assignedUser", "actions"]

  return (
    <div className='min-h-screen'>
      <div className='mx-auto w-3/4 mt-15'>
        <h3 className='ms-auto text-2xl font-bold m-2'>PROJECTS TABLE</h3>
        <TableComponent 
          columns={columns}
          data={projects}
          statusOptions={statusOptions}
          statusColorMap={statusColorMap}
          initialVisibleColumns={initialVisibleColumns}
        />
      </div>
    </div>
  )
}

export default Projects