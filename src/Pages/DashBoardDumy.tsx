// pages/Users.tsx
import React, { useState } from 'react';
import DashboardHeader from '../components/common/dashBoard/dashBoardHeader';
import type { Tab, ActionButton } from '../types/dashBoardTypes';
import {Bell,ChartNoAxesColumn,DollarSign,Home,Landmark,Layers,LayoutList,Plus,Settings} from 'lucide-react';
const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs: Tab[] = [
    //    {
    //   id: 'overview',
    //   name: 'Overview',
    //   icon: <Home className="mr-2 h-5 w-5" />,
    //   path: '/projects',
    // },
    // {
    //   id: 'projectTracking',
    //   name: 'Project Tracking',
    //   icon: <Layers className="mr-2 h-5 w-5" />,
    //   path: '/projects/projectTracking',
    // },
    {id: 'analytics',name: 'Analytics',icon: <ChartNoAxesColumn className="mr-2 h-5 w-5" />,path: '#',},
    {id: 'finance', name: 'Finance',icon: <Landmark className="mr-2 h-5 w-5" />,path: '/projects/finance', },
    {id: 'advanceFinance',name: 'Advance',icon: <DollarSign className="mr-2 h-5 w-5" />,path: '/projects/advanceFinance', },
    {id: 'allGeneralTask',name: 'General',icon: <LayoutList className="mr-2 h-5 w-5" />,path: '/projects/allGeneralTask',},
    {id: 'notification',name: 'Notification',icon: <Bell className="mr-2 h-5 w-5" />,path: '/projects/notification',},
    {id: 'settings',name: 'Settings',icon: <Settings className="mr-2 h-5 w-5" />,path: '/projects/settings',},

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
      <div className="container mx-auto px-4">

        {/* Simple Dashboard Header */}
        <DashboardHeader
          title="PROJECTS DASHBOARD"
          subtitle="Monitoring 115 projects across Saudi Arabia"
          tabs={tabs}
          bgColor="bg-violet-950"
          actionButtons={actionButtons}
          activeTab={activeTab}        // controlled prop
          onTabChange={setActiveTab}
        />



        {/* Your page content */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;