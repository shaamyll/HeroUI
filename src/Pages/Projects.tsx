import { useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { projectData } from '../Data/Projects';
import { addToast } from '@heroui/toast';

function Projects() {
  const [projects, setProjects] = useState(projectData.projects);

    
      const handleDeleteProject = (projectId: number) => {
          const userIndex = projectData.projects.findIndex(project => project.id === projectId);
          let projectName = '';
          
          if (userIndex !== -1) {
              const deletedUser = projectData.projects[userIndex];
               projectName = deletedUser.projectName || 'User';
              projectData.projects.splice(userIndex, 1);
              
              // Show success toast
              addToast({
                  title: 'Success',
                  description: `${projectName} has been deleted successfully`,
                  color: 'success',
              });
          }
          
          // Update React state to reflect the change
          setProjects([...projectData.projects]); 
      };

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
          onDelete={handleDeleteProject}
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
