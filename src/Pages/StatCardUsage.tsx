// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  DollarSign, 
  Wrench, 
  Activity, 
  Building,
  Users,
  ShoppingCart,
  Zap,
  TrendingUp
} from 'lucide-react';
import StatsContainer  from '../components/StatCard';
import type { StatItemData } from '../components/StatCard';

// Mock data - replace with your actual data source
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
    icon: Users,
    color: 'purple',
    trend: {
      percentage: 12,
      period: 'from last month',
      isPositive: true
    },
    description: 'Registered customers'
  }
];

export default function Dashboard() {
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


      </div>
    </div>
  );
}