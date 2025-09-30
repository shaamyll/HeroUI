import React from 'react';
import { MonitorSmartphone, ShieldCheck, Info, CreditCard } from "lucide-react";
import  { Accordion } from '../../components/common/settings/SettingsLeftContainer';
import Users from '../settingsData1';
import Projects from '../settingsData2';
import DashboardHeader from '@/components/common/dashBoard/dashBoardHeader';

/*I. --------------------------------------------------------------------------------------------------------------------------- */
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  Bell,
} from 'lucide-react';
import type { Tab, ActionButton } from '../../types/dashBoardTypes';

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

export default function QRSettings() {
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
      name: 'Stores',
      icon: <FileText className="mr-2 h-5 w-5" />,
      path: '/sop/recipes',
    },
    {
      id: 'manuals',
      name: 'Categories',
      icon: <BookOpen className="mr-2 h-5 w-5" />,
      path: '/sop/manuals',
    },
    {
      id: 'checklists',
      name: 'Menu',
      icon: <ClipboardCheck className="mr-2 h-5 w-5" />,
      path: '/sop/checklists',
    },
    {
      id: 'announcements',
      name: 'settings',
      icon: <Bell className="mr-2 h-5 w-5" />,
      path: '/sop/announcements',
    },
  ];
   
  const actionButtons: ActionButton[] = [
    {
      id: 'create-user',
      label: 'Create Menu',
      
      onClick: () => console.log('Creating user...'),
    },
  ];

  const accordionItems = [
    {
      key: "1",
      title: "Restaurant Offers",
      subtitle: (
        <span className="flex text-sm text-gray-600">
         Manage offers and discounts
        </span>
      ),
      icon: <InvalidCardIcon className="text-red-500" />,
      content: <Users />
    },
    {
      key: "2",
      title: "Theme and Desighn",
      subtitle: <span>Customize appearance and branding</span>,
      icon: <InfoIcon className="text-orange-500" />,
      content: <Projects/>
    },
    {
      key: "3",
      title: "Branding Details",
      subtitle: <span >Configure brand information</span>,
      icon: <ShieldSecurityIcon className="text-gray-600" />,
      content: <Users/>
    },
    
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader
        title="QR ANALYTICS"
        subtitle="Monitor QR scans and menu performance with real-time insights."
        tabs={tabs}
        bgColor="bg-orange-500"
        actionButtons={actionButtons}
      />
      <div className="p-6 bg-white w-full">
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}