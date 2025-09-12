// Example 1: Basic Usage in Users Page
import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import { Home, Settings, Plus, Trash2, UsersIcon } from "lucide-react"; 
// Simple icons (you can replace with your preferred icon library)
// const HomeIcon = () => (
//   <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//   </svg>
// );

// const UsersIcon = () => (
//   <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//   </svg>
// );

// const SettingsIcon = () => (
//   <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//   </svg>
// );

// const PlusIcon = () => (
//   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//   </svg>
// );
// const DeleteIcon= ()=>(
//   <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//   </svg>

// )

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userCount] = useState(145); // Your user count from state/API

  // Define tabs
  const tabs = [
    {
      id: 'overview',
      name: 'Overview',
      icon:<Home className="h-5 w-5 mr-2" />,
      path: '/users',
    },
    {
      id: 'manage',
      name: 'Manage Users',
      icon: <UsersIcon className="h-5 w-5 mr-2" />,
      path: '/users/manage',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="h-5 w-5 mr-2" />,
      path: '/users/settings',
    },
    {
      id: 'demo',
      name: 'Demo',
      icon: <Trash2 className="h-5 w-5 mr-2" />,
      path:'/users/demo',

    }
  ];

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <DashboardHeader
          title="Project Lyncs 2.0"
          subtitle={`Managing ${userCount} users across the platform`}
          moduleName="DashBoardPage"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          actionButtons={actionButtons}
          mobileFloatingButtons={mobileFloatingButtons}
          userPermissions={userPermissions}
          bgColor="bg-gradient-to-r from-blue-600 to-blue-700"
          showMobileNav={true}
          mobileBreakpoint={768}
        />

        {/* Your page content here */}
        <div className="bg-white rounded-lg shadow p-6">
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
