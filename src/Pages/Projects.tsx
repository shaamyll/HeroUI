import React, { useState } from 'react';
import TableComponent from '../components/Reusable/Table';
import { projectData } from '../Data/Projects'

function Projects() {
  const [projects, setProjects] = useState(projectData.projects);


  const columns = [
    { name: 'ID', uid: 'id', sortable: true },
    { name: 'PROJECT NAME', uid: 'projectName', sortable: true },
    { name: 'ASSIGNED TO', uid: 'assignedUser', sortable: true },
    { name: 'TIME PERIOD', uid: 'timePeriod' },
    { name: 'STATUS', uid: 'projectStatus', sortable: true },
    { name: 'DIFFICULTY', uid: 'projectDifficulty' },
    { name: 'ACTIVE', uid: 'isActive' },
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

  const initialVisibleColumns = ["projectName", "id", "projectStatus", "projectDifficulty", "assignedUser", "isActive", "actions"]

  return (
    <div className='min-h-screen'>
      <div className='mx-auto w-3/4 mt-15'>
        <h3 className='ms-auto text-2xl font-bold mb-5'>PROJECTS TABLE :</h3>
        <TableComponent
          columns={columns}
          data={projects}
          statusOptions={statusOptions}
          statusColorMap={statusColorMap}
          initialVisibleColumns={initialVisibleColumns}
          onStatusChange={(id, isActive) => {
            setProjects(prevProjects =>
              prevProjects.map(project =>
                project.id === id ? { ...project, isActive } : project
              )
            );
          }}
        />
      </div>
    </div>
  )
}

export default Projects