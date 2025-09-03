import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { projectData } from '../Data/Projects';
import { addToast } from '@heroui/react';

function Projects() {
  const [projects, setProjects] = useState(projectData.projects);

    
      const handleDeleteProject = useCallback((projectId: number) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.filter(project => project.id !== projectId);
      const deletedProject = prevProjects.find(project => project.id === projectId);
      
      if (deletedProject) {
        addToast({
          title: 'Success',
          description: `Project "${deletedProject.projectName}" has been deleted successfully.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
      
      return updatedProjects;
    });
  }, []);

  const handleEditProject = useCallback((updatedProject: any) => {
    setProjects(prevProjects => {
      const updatedProjects = prevProjects.map(project => 
        project.id === updatedProject.id ? { ...project, ...updatedProject } : project
      );
      
      addToast({
        title: 'Success',
        description: `Project "${updatedProject.projectName}" has been updated successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      return updatedProjects;
    });
  }, []);

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
          onEdit={handleEditProject}
          isSearch={false}
          onStatusChange={(id, isActive) => {
            setProjects(prevProjects =>
              prevProjects.map(project =>
                project.id === id ? { ...project, isActive } : project
              )
            );
          }}
          type="project"
        />
      </div>
    </div>
  );
}

export default Projects;
