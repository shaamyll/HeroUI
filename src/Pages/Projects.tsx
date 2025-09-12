import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { projectData } from '../Data/Projects';
import { addToast, Chip, Progress } from '@heroui/react';
import { motion } from 'framer-motion';
import TableActions from '../components/Reusable/TableActions';

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
        projectStatus: 'In Progress'
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
  } as const;

    type projectStatus = keyof typeof statusColorMap;

const projectHeaderData = [
  { name: "ID", headerId: "id", sortable: true },
  {
    name: "Project",
    headerId: "projectName",
    sortable: true,
    render: (item: any) => (
      <div className="flex items-center gap-3">
        <span className="">{item.projectName}</span>
      </div>
    ),
  },
  {
    name: "Assigned To",
    headerId: "assignedUserName",
    sortable: true,
    render: (item: any) => (
      <div className="flex items-center gap-3">
        <Chip color="secondary" size="sm" variant="faded">
          {item.assignedUserName}
        </Chip>
      </div>
    ),
  },
  { name: "Time Period", headerId: "timePeriod", sortable: true },
  {
    name: "Status",
    headerId: "projectStatus",
    sortable: true,
    render: (item: any) => (
      <Chip color={statusColorMap[item.projectStatus as projectStatus]} size="sm" variant="dot">
        {item.projectStatus}
      </Chip>
    ),
  },
  {
    name: "Progress",
    headerId: "progress",
    sortable: true,
    render: (item: any) => (
      <div className="flex items-center gap-2">
        <Progress
          value={item.progress}
          color="primary"
          className="w-20 h-10"
          showValueLabel={true}
        />
        <span className="text-xs">{item.progress}%</span>
      </div>
    ),
  },
  {
    name: "Actions",
    headerId: "actions",
    sortable: false,
    className: "text-center w-28",
    render: (item: any) => (
      <TableActions
        item={item}
        onDelete={handleDeleteProject} 
        onEdit={handleEditProject}     
        type="project"
      />
    ),
  },
];



  return (
    <div className='min-h-screen'>
      <div className="max-w-[1400px] mx-auto mt-10 px-4">
        <div className="w-full bg-purple-950 rounded-2xl p-6 mb-5">
          <motion.h3
            className="text-2xl font-bold text-white pb-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Projects Table :
          </motion.h3>
        </div>
        <TableComponent
          type="project"
          data={projects}
          headerData={projectHeaderData}
          statusOptions={statusOptions}
          statusColorMap={statusColorMap}
          onDelete={handleDeleteProject}
          onEdit={handleEditProject}
          isSearch={true}
          isSelectRows={false}
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
