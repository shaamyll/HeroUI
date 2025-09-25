// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Accordion } from '../components/common/settings/SettingsLeftContainer';
import { MonitorSmartphone, ShieldCheck, Info, CreditCard } from "lucide-react";

import Projects from './settingsData2';
import {
  Box,
  DollarSign,
  Wrench,
  Activity,
  Building,

  ShoppingCart,
  Zap,
  TrendingUp
} from 'lucide-react';
import StatsContainer from '../components/StatCard';
import type { StatItemData } from '../components/StatCard';
import DashboardHeader from '@/components/common/dashBoard/dashBoardHeader';
import {
  BookOpen,
  FileText,
  ClipboardCheck,
  Bell,
} from 'lucide-react';
import type { Tab, ActionButton } from '../types/dashBoardTypes';

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

// Mock data - replace with your actual data source
const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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
    content: <Projects />
  },
  {
    key: "2",
    title: "Apps Permissions",
    subtitle: <span className="text-sm text-gray-600">3 apps have read permissions</span>,
    icon: <InfoIcon className="text-orange-500" />,
    content: <Projects />
  },
  {
    key: "3",
    title: "Pending tasks",
    subtitle: <span className="text-sm text-orange-500">Complete your profile</span>,
    icon: <ShieldSecurityIcon className="text-gray-600" />,
    content: <Projects />
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
const mockStatsData: StatItemData[] = [
  {
    id: 'inventory',
    title: 'Active Recipes',
    value: 11,
    icon: Box,
    color: 'green',
    trend: {
      percentage: 200,
      period: 'from last month',
      isPositive: true
    },
   

  },


  {
    id: 'active-users',
    title: 'Active Manuals',
    value: 3,

    color: 'green',
    trend: {
      percentage: 20,
      period: 'from last week',
      isPositive: true
    },
    badge: 'Growing',
   
  },
  {
    id: 'orders',
    title: 'Active Checklists',
    value: 89,
    icon: ShoppingCart,
    color: 'green',
    trend: {
      percentage: 24,
      period: 'from yesterday',
      isPositive: true
    },
   
  },
  {
    id: 'energy-usage',
    title: 'Recent Updates',
    value: '9',
    icon: Zap,
    color: 'orange',
    trend: {
      percentage: 90,
      period: 'from last month',
      isPositive: false
    },
   
  }
];

// Alternative data sets for different scenarios
const alternativeStatsData: StatItemData[] = [
  {
    id: 'sales',
    title: 'Total Sales',
    value: '$89.2K',
    icon: TrendingUp,
    color: 'green',
    trend: {
      percentage: 18,
      period: 'from last quarter',
      isPositive: true
    },
    description: 'Quarterly sales performance'
  },
  {
    id: 'products',
    title: 'Products',
    value: 456,
    icon: Box,
    color: 'blue',
    badge: 'New',
    description: 'Total products in catalog'
  },
  {
    id: 'customers',
    title: 'Customers',
    value: 2347,

    color: 'purple',
    trend: {
      percentage: 12,
      period: 'from last month',
      isPositive: true
    },
    description: 'Registered customers'
  }
];

export default function Dashboard() 
{
  const [statsData, setStatsData] = useState<StatItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDataSet, setCurrentDataSet] = useState<'main' | 'alternative'>('main');

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Set data based on current selection
        const dataToUse = currentDataSet === 'main' ? mockStatsData : alternativeStatsData;
        setStatsData(dataToUse);
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setStatsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDataSet]);

  // Handle stat item clicks
  const handleStatClick = (item: StatItemData, index: number) => {
    console.log('Dashboard stat clicked:', {
      title: item.title,
      value: item.value,
      index,
      timestamp: new Date().toISOString()
    });

    // You can add navigation or modal opening logic here
    // For example:
    // navigate(`/details/${item.id}`);
    // setSelectedStat(item);
    // setModalOpen(true);
  };

  // Toggle between data sets
  const toggleDataSet = () => {
    setCurrentDataSet(prev => prev === 'main' ? 'alternative' : 'main');
  };

  // Refresh data
  const refreshData = () => {
    setStatsData([]);
    setLoading(true);

    setTimeout(() => {
      const dataToUse = currentDataSet === 'main' ? mockStatsData : alternativeStatsData;
      setStatsData(dataToUse);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="py-8">
        <DashboardHeader
          title="Standard Operating Procedures"
          subtitle="Monitoring Standard Operating Procedures across all locations"
          tabs={tabs}
          bgColor="bg-green-900"
          actionButtons={actionButtons}
        />
        <StatsContainer
          statsData={statsData}
          size="md"
          variant="default"
          columns={{ sm: 1, md: 2, lg: 4 }}
          loading={loading}
          error={error || undefined}
          onItemClick={handleStatClick}
          animated={true}
          ariaLabel="Main dashboard statistics"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />

        <div className="p-6 bg-white w-full">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  );
}