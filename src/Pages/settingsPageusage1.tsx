import React from 'react';
import { MonitorSmartphone, ShieldCheck, Info, CreditCard } from "lucide-react";
import { Accordion } from '../components/common/settings/SettingsLeftContainer';
import Users from './settingsData1';
import Projects from './settingsData2';
import DashboardHeader from '@/components/common/dashBoard/dashBoardHeader';

/*I. --------------------------------------------------------------------------------------------------------------------------- */
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  Bell,
} from 'lucide-react';
import type { Tab, ActionButton } from '../types/dashBoardTypes';

/* ------------------------------------------------------------------------------------------------------------------------------  */
const MonitorMobileIcon = (props: React.ComponentProps<typeof MonitorSmartphone>) => (
  <MonitorSmartphone size={24} {...props} />
);

const ShieldSecurityIcon = (props: React.ComponentProps<typeof ShieldCheck>) => (
  <ShieldCheck size={24} {...props} />
);

const InfoIcon = (props: React.ComponentProps<typeof Info>) => (
  <Info size={24} {...props} />
);

const InvalidCardIcon = (props: React.ComponentProps<typeof CreditCard>) => (
  <CreditCard size={24} {...props} />
);

export default function SettingsProject() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
     
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

  const accordionItems = [
    {
      key: "1",
      title: "Connected devices",
      subtitle: (
        <span className="flex text-sm text-gray-600">
          2 issues to <span className="text-blue-500 ml-1">fix now</span>
        </span>
      ),
      icon: <InvalidCardIcon className="text-red-500" />,
      content: <Users />
    },
    {
      key: "2",
      title: "Apps Permissions",
      subtitle: <span className="text-sm text-gray-600">3 apps have read permissions</span>,
      icon: <InfoIcon className="text-orange-500" />,
      content: <Projects/>
    },
    {
      key: "3",
      title: "Pending tasks",
      subtitle: <span className="text-sm text-orange-500">Complete your profile</span>,
      icon: <ShieldSecurityIcon className="text-gray-600" />,
      content: <Users/>
    },
    {
      key: "4",
      title: (
        <span className="flex gap-1 items-center">
          Card expired
          <span className="text-gray-400 text-sm">*4812</span>
        </span>
      ),
      subtitle: <span className="text-sm text-red-500">Please, update now</span>,
      icon: <MonitorMobileIcon className="text-blue-500" />,
      content: defaultContent
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader
        title="Standard Operating Procedures"
        subtitle="Monitoring Standard Operating Procedures across all locations"
        tabs={tabs}
        bgColor="bg-green-900"
        actionButtons={actionButtons}
        fullWidth={true}
      />
      <div className="p-6 bg-white w-full">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}