// pages/Users.tsx
import React, { useState } from 'react';
import DashboardHeader from '../components/common/dashBoard/dashBoardHeader';
import type { Tab, ActionButton } from '../types/dashBoardTypes';
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  Bell,
 
} from 'lucide-react';
const Dummy: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs: Tab[] = [
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
      icon: <Bell />,
      onClick: () => console.log('Creating user...'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Simple Dashboard Header */}
        <DashboardHeader
          title="Standard Operating Procedures"
          subtitle="Monitoring Standard Operating Procedures across all locations"
          tabs={tabs}
          bgColor="bg-green-900"
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

export default Dummy;