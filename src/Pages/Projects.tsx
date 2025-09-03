import { useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { projectData } from '../Data/Projects';

function Projects() {
  const [projects, setProjects] = useState(projectData.projects);

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


  return (
    <div className='min-h-screen'>
      <div className='mx-auto w-3/4 mt-15'>
        <h3 className='ms-auto text-2xl font-bold mb-5'>PROJECTS TABLE :</h3>
        <TableComponent
          data={projects}
          statusOptions={statusOptions}
          statusColorMap={statusColorMap}
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
  );
}

export default Projects;
