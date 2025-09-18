// Example 1: Basic Usage in Users Page
import React, { useState } from 'react';
import DashboardHeader from '../components/common/DashboardHeader';
import DotGrid from '../components/DotGrid';
import { Home, Settings, Plus, Trash2, UsersIcon, Pencil } from "lucide-react";
 
const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home'); // Changed to match a tab that exists
  const [userCount] = useState(145); // Your user count from state/API

  // Define tabs - UNCOMMENTED AND FIXED
  const tabs = [
    {
      id: 'home',
      name: 'Home',
      icon: <Home className="h-5 w-5" />, // Removed mr-2 as it's not needed in dock
      path: '/',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <Trash2 className="h-5 w-5" />,
      path: '/analytics',
    },
    {
      id: 'users',
      name: 'Users',
      icon: <UsersIcon className="h-5 w-5" />,
      path: '/users',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/settings',
    },
    {
      id: 'demo',
      name: 'Demo',
      icon: <Pencil className="h-5 w-5" />,
      path: '/demo',
    }
  ];

  // Define action buttons
  const actionButtons = [
    {
      id: 'create-user',
      label: 'Create User',
      icon: <Plus className="h-4 w-4" />,
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
      icon: <Plus className="h-5 w-5" />,
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
          tabs={tabs} // Now using the properly defined tabs array
          activeTab={activeTab}
          onTabChange={handleTabChange}
          actionButtons={actionButtons}
          mobileFloatingButtons={mobileFloatingButtons}
          userPermissions={userPermissions}
          bgColor="bg-violet-950"
          showMobileNav={true}
          mobileBreakpoint={768}
          dockProps={{
            magnification: 60,
            distance: 150,
            baseItemSize: 48,
            panelHeight: 64
          }}
        />

        {/* Your page content here */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === 'home' && 'Home Dashboard'}
            {activeTab === 'analytics' && 'Analytics Overview'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'settings' && 'Settings Panel'}
            {activeTab === 'demo' && 'Demo Section'}
          </h2>

          {/* Your existing table component and other content */}
          <p className="text-gray-600">
            Current active tab: <span className="font-semibold capitalize">{activeTab}</span>
          </p>
          
          {/* Add some sample content based on active tab */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            {activeTab === 'home' && (
              <div>
                <h3 className="font-medium mb-2">Dashboard Overview</h3>
                <p className="text-sm text-gray-600">Welcome to your project dashboard. Monitor your projects and analytics here.</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="font-medium mb-2">Analytics Data</h3>
                <p className="text-sm text-gray-600">View detailed analytics and reports for your projects.</p>
              </div>
            )}
            {activeTab === 'users' && (
              <div>
                <h3 className="font-medium mb-2">User Management</h3>
                <p className="text-sm text-gray-600">Manage users, roles, and permissions. Total users: {userCount}</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h3 className="font-medium mb-2">System Settings</h3>
                <p className="text-sm text-gray-600">Configure system preferences and application settings.</p>
              </div>
            )}
            {activeTab === 'demo' && (
              <div>
                <h3 className="font-medium mb-2">Demo Features</h3>
                <p className="text-sm text-gray-600">Explore demo features and sample functionality.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;