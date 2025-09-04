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
          title: 'Deleted Successfully',
          description: `Project "${deletedProject.projectName}" has been deleted successfully.`,
          color: 'danger',
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
        color: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      return updatedProjects;
    });
  }, []);

  const handleAddProject = useCallback((newProject: any) => {
    setProjects(prevProjects => {
      const projectWithId = {
        ...newProject,
        id: Math.max(0, ...prevProjects.map(p => p.id)) + 1, // Generate a new ID
        isActive: true // Default to active when creating a new project
      };
      
      addToast({
        title: 'Success',
        description: `Project "${newProject.projectName}" has been added successfully.`,
        color: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      return [...prevProjects, projectWithId];
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
        type="project"
          data={projects}
          statusOptions={statusOptions}
          statusColorMap={statusColorMap}
          onDelete={handleDeleteProject}
          onEdit={handleEditProject}
          on
          isSearch={false}
          onStatusChange={(id, isActive) => {
            setProjects(prevProjects =>
              prevProjects.map(project =>
                project.id === id ? { ...project, isActive } : project
              )
            );
          }}
          onAdd={handleAddProject}
        />
      </div>
    </div>
  );
}

export default Projects;
