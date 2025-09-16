import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { projectData } from '../Data/Projects';
import { addToast, Chip, Progress, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Eye, PencilLine, Trash2 } from 'lucide-react';

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

  const TableStructure = [
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
      name: 'Actions',
      headerId: 'actions',
      sortable: false,
      render: (item: any) => (
        <div className="relative flex items-center gap-3">
          <Tooltip content="Details">
            <span className="text-md text-default-400 cursor-pointer active:opacity-50">
              <Eye className="w-4 h-4" />
            </span>
          </Tooltip>

          <Tooltip content="Edit user">
            <span className="text-md text-default-400 cursor-pointer active:opacity-50">
              <PencilLine className="w-4 h-4" />
            </span>
          </Tooltip>

          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <Trash2 className="w-4 h-4" />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];



  return (
    <div className='min-h-screen'>
      <div className="max-w-[1400px] mx-auto mt-10">
        <div className="w-full bg-purple-950 rounded-2xl p-6 ">
          <motion.h3
            className="text-2xl font-bold text-white pb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Projects Table :
          </motion.h3>
        </div>
        <TableComponent
          type="project"
          TableContent={projects}
          TableStructure={TableStructure}
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
