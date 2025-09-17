// Example 1: Basic Usage in Users Page
import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import DotGrid from '../components/DotGrid';
import { Home, Settings, Plus, Trash2, UsersIcon, Pencil } from "lucide-react";
 
const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userCount] = useState(145); // Your user count from state/API

  // Define tabs
  // const tabs = [
  //   {
  //     id: 'overview',
  //     name: 'Overview',
  //     icon:<Home className="h-5 w-5 mr-2" />,
  //     path: '/users',
  //   },
  //   {
  //     id: 'manage',
  //     name: 'Manage Users',
  //     icon: <UsersIcon className="h-5 w-5 mr-2" />,
  //     path: '/users/manage',
  //   },
  //   {
  //     id: 'settings',
  //     name: 'Settings',
  //     icon: <Settings className="h-5 w-5 mr-2" />,
  //     path: '/users/settings',
  //   },
  //   {
  //     id: 'demo',
  //     name: 'Demo',
  //     icon: <Trash2 className="h-5 w-5 mr-2" />,
  //     path:'/users/demo',

  //   }
  // ];

  // Define action buttons
  const actionButtons = [
    {
      id: 'create-user',
      label: 'Create User',
      icon: <Plus />,
      onClick: () => {
        // Your create user logic
        console.log('Creating new user...');
      },
      variant: 'primary' as const,
      permissions: ['create_user'], // Optional: only show if user has this permission
    },
  ];

  // Mobile floating buttons
  const mobileFloatingButtons = [
    {
      id: 'create-user-mobile',
      label: 'Create User',
      icon: <Plus />,
      onClick: () => {
        console.log('Creating new user (mobile)...');
      },
      permissions: ['create_user'],
    },
  ];

  // Handle tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Handle navigation logic here
    const selectedTab = tabs.find(tab => tab.id === tabId);
    if (selectedTab) {
      // Navigate to the path (if using React Router)
      // navigate(selectedTab.path);
      console.log(`Navigating to: ${selectedTab.path}`);
    }
  };

  // User permissions (get this from your auth context/state)
  const userPermissions = ['create_user', 'edit_user', 'delete_user'];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Full-page DotGrid background */}
      <div className="fixed inset-0 -z-10">
        <DotGrid        
          baseColor="#FAF9F7"
          activeColor="#FAF9F7"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Dashboard Header */}
        <DashboardHeader
          title="Project Dashboard"
          subtitle="Monitoring 108 projects across Saudi Arabia"
          tabs={[
            { id: 'home', name: 'Home', icon: <Home />, path: '/' },
            { id: 'analytics', name: 'Analytics', icon: <Trash2 />, path: '/analytics' },
             { id: 'home', name: 'Home', icon: <Pencil />, path: '/' },
            { id: 'analytics', name: 'Analytics', icon: <UsersIcon/>, path: '/analytics' },
             { id: 'home', name: 'Home', icon: <Settings />, path: '/' },
          ]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
           actionButtons={actionButtons}
            mobileFloatingButtons={mobileFloatingButtons}
          userPermissions={userPermissions}
           bgColor="bg-violet-950"
           showMobileNav={true}
          mobileBreakpoint={768}
          dockProps={{
            magnification: 80,
            distance: 150,
            baseItemSize: 48
          }}
        />

        {/* Your page content here */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === 'overview' && 'User Overview'}
            {activeTab === 'manage' && 'Manage Users'}
            {activeTab === 'settings' && 'User Settings'}
          </h2>

          {/* Your existing table component and other content */}
          <p className="text-gray-600">
            Current active tab: {activeTab}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Users;
