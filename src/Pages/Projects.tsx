import { useCallback, useState } from 'react';
import TableComponent from '../components/Reusable/TableComponent';
import { projectData } from '../Data/Projects';
import { addToast } from '@heroui/react';
import { motion } from 'framer-motion';
import DashboardHeader from "../components/common/DashboardHeader";

function Projects() {
  const [projects, setProjects] = useState(projectData.projects);

  // ✅ Tabs and Actions should be here (top-level, not inside a callback)
  const tabs = [
    { id: "overview", name: "Overview", path: "/projects/overview" },
    { id: "active", name: "Active", path: "/projects/active" },
    { id: "completed", name: "Completed", path: "/projects/completed" },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  const actionButtons = [
    {
      id: "add-project",
      label: "Add Project",
      onClick: () => {
        addToast({
          title: "Add Project",
          description: "Add project button clicked.",
          color: "primary",
        });
      },
      variant: "primary",
    },
  ];

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
        id: Math.max(0, ...prevProjects.map(p => p.id)) + 1,
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
  };

  return (
    <div className='min-h-screen'>
      {/* ✅ Dashboard Header */}
      <DashboardHeader
        moduleName="projects"
        title="Projects Dashboard"
        subtitle="Manage and track your projects efficiently"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actionButtons={actionButtons}
        userPermissions={["create", "edit", "delete"]}
      />

      <div className='mx-auto w-3/4 mt-15'>
        <motion.h3
          className="ms-auto text-2xl font-bold mb-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          PROJECTS TABLE :
        </motion.h3>

        <TableComponent
          type="project"
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
          onAdd={handleAddProject}
        />
      </div>
    </div>
  );
}

export default Projects;
