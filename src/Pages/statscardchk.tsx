import React, { useState } from 'react';
import { StatsContainer, type StatItemData } from '../components/index';
import {
  Box,
  Users,
  ShoppingCart,
  Zap,
  TrendingUp
} from 'lucide-react';

// Mock data
const mockStatsData: StatItemData[] = [
  {
    id: 'inventory',
    title: 'Total Assets',
    value: 250000,
    icon: Box,
    color: 'blue',
    trend: {
      percentage: 200,
      period: 'from last month',
      isPositive: true
    },
    statusData: {
      active: 35,
      inactive: 1,
      notInUse: 80,
    },
  },
  {
    id: 'active-users',
    title: 'Active Users',
    value: 1248,
    icon: Users,
    color: 'blue',
    trend: {
      percentage: 7,
      period: 'from last week',
      isPositive: true
    },
    badge: 'Growing',
    description: 'Users active in the last 30 days'
  },
  {
    id: 'orders',
    title: 'Orders Today',
    value: 89,
    icon: ShoppingCart,
    color: 'green',
    trend: {
      percentage: 24,
      period: 'from yesterday',
      isPositive: true
    },
    description: 'Orders processed today'
  },
  {
    id: 'energy-usage',
    title: 'Energy Usage',
    value: '847 kWh',
    icon: Zap,
    color: 'orange',
    trend: {
      percentage: 5,
      period: 'from last month',
      isPositive: false
    },
    description: 'Monthly energy consumption'
  }
];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatClick = (item: StatItemData, index: number) => {
    console.log('Clicked:', item.title);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <StatsContainer
        statsData={mockStatsData}
        loading={loading}
        error={error}
        onItemClick={handleStatClick}
      />
    </div>
  );
}