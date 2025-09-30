// pages/Users.tsx - COMPLETE UPDATED VERSION
import React, { useState } from 'react';
import DashboardHeader from '../components/common/dashBoard/dashBoardHeader';
import NavbarComponent from '../components/Reusable/NavbarComponent';
import type { Tab, ActionButton } from '../types/dashBoardTypes';
import { 
  Bell, 
  ChartNoAxesColumn, 
  DollarSign, 
  Home, 
  Landmark, 
  Layers, 
  LayoutList, 
  Plus, 
  Settings,
  BookOpen,
  FileText,
  ClipboardCheck,
} from 'lucide-react';

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Projects Dashboard Tabs
  const tabs: Tab[] = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <Home className="mr-2 h-5 w-5" />,
      path: '/projects',
    },
    {
      id: 'projectTracking',
      name: 'Project Tracking',
      icon: <Layers className="mr-2 h-5 w-5" />,
      path: '/projects/projectTracking',
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: <ChartNoAxesColumn className="mr-2 h-5 w-5" />, 
      path: '#',
    },
    { 
      id: 'finance', 
      name: 'Finance', 
      icon: <Landmark className="mr-2 h-5 w-5" />, 
      path: '/projects/finance',
    },
    { 
      id: 'advanceFinance', 
      name: 'Advance', 
      icon: <DollarSign className="mr-2 h-5 w-5" />, 
      path: '/projects/advanceFinance',
    },
    { 
      id: 'allGeneralTask', 
      name: 'General', 
      icon: <LayoutList className="mr-2 h-5 w-5" />, 
      path: '/projects/allGeneralTask',
    },
    { 
      id: 'notification', 
      name: 'Notification', 
      icon: <Bell className="mr-2 h-5 w-5" />, 
      path: '/projects/notification',
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings className="mr-2 h-5 w-5" />, 
      path: '/projects/settings',
    },
  ];

  // Audit Dashboard Tabs
  const tabs2: Tab[] = [
    { 
      id: 'analytics', 
      name: 'Overview', 
      icon: <ChartNoAxesColumn className="mr-2 h-5 w-5" />, 
      path: '#',
    },
    { 
      id: 'finance', 
      name: 'Audits', 
      icon: <Landmark className="mr-2 h-5 w-5" />, 
      path: '/projects/finance',
    },
    { 
      id: 'advanceFinance', 
      name: 'settings', 
      icon: <DollarSign className="mr-2 h-5 w-5" />, 
      path: '/projects/advanceFinance',
    },
  ];

  // SOP Dashboard Tabs
  const tabs3: Tab[] = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      path: '/sop',
    },
    {
      id: 'recipes',
      name: 'Recipes',
      icon: <FileText className="mr-2 h-5 w-5" />,
      path: '/sop/recipes',
    },
    {
      id: 'manuals',
      name: 'Manuals',
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      path: '/sop/manuals',
    },
    {
      id: 'checklists',
      name: 'Checklists',
      icon: <ClipboardCheck className="mr-2 h-5 w-5" />,
      path: '/sop/checklists',
    },
    {
      id: 'announcements',
      name: 'Announcements',
      icon: <Bell className="mr-2 h-5 w-5" />,
      path: '/sop/announcements',
    },
  ];

  const actionButtons: ActionButton[] = [
    {
      id: 'create-user',
      label: 'Add User',
      icon: <Plus />,
      onClick: () => console.log('Creating user...'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar with sticky tabs functionality */}
      <NavbarComponent 
        dashboardTabs={tabs}
        activeDashboardTab={activeTab}
        onDashboardTabChange={setActiveTab}
        dashboardBgColor="bg-violet-950"
      />
      
      <div className="container mx-auto px-4">
        {/* Projects Dashboard - Primary dashboard with sticky tabs */}
        <div id="dashboard-header">
          <DashboardHeader
            title="PROJECTS DASHBOARD"
            subtitle="Monitoring 115 projects across Saudi Arabia"
            tabs={tabs}
            bgColor="bg-violet-950"
            actionButtons={actionButtons}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* SOP Dashboard */}
        <DashboardHeader
          title="Standard Operating Procedures"
          subtitle="Monitoring Standard Operating Procedures across all locations"
          tabs={tabs3}
          bgColor="bg-green-900"
          actionButtons={actionButtons}
        />

        {/* Audit Dashboard */}
        <DashboardHeader
          title="Audit DashBoard"
          subtitle="Monitoring quality standards across all locations"
          tabs={tabs2}
          bgColor="bg-blue-600"
          actionButtons={actionButtons}
        />

        {/* Page Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Current Tab: {activeTab}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <h3 className="font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">145</p>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <h3 className="font-medium">Active</h3>
              <p className="text-2xl font-bold text-green-600">132</p>
            </div>
            <div className="p-4 bg-purple-50 rounded">
              <h3 className="font-medium">Roles</h3>
              <p className="text-2xl font-bold text-purple-600">8</p>
            </div>
          </div>

          {/* Your existing table/content goes here */}
          <div className="mt-6">
            <p className="text-gray-600">Your user table and other content here...</p>
            
            {/* Adding more content to demonstrate scrolling */}
            <div className="mt-8 space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">User Management</h3>
                <p className="text-gray-600">
                  Manage all users across your organization. Add, edit, or remove user accounts,
                  assign roles and permissions, and monitor user activity.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• John Doe updated profile information</li>
                  <li>• Sarah Smith was assigned Admin role</li>
                  <li>• New user registration: Mike Johnson</li>
                  <li>• Password reset requested by Jane Williams</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">User Statistics</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">New Users This Month</p>
                    <p className="text-2xl font-bold text-blue-600">23</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active Sessions</p>
                    <p className="text-2xl font-bold text-green-600">87</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Approvals</p>
                    <p className="text-2xl font-bold text-orange-600">5</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Inactive Users</p>
                    <p className="text-2xl font-bold text-red-600">13</p>
                  </div>
                </div>
              </div>

              {/* More content for scrolling demonstration */}
              <div className="h-96 border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">User Table Placeholder</h3>
                <p className="text-gray-500">Your user data table will go here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;