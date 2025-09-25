import StatsContainer from "@/components/StatCard";
import type { StatItemData } from '../components/StatCard';
import { MonitorSmartphone, ShieldCheck, TreePineIcon,  } from "lucide-react";
import {Box,DollarSign,Wrench,Activity,Building,ShoppingCart,Zap,TrendingUp} from 'lucide-react';
const MonitorMobileIcon = (props: React.ComponentProps<typeof MonitorSmartphone>) => (
  <MonitorSmartphone size={24} {...props} />
);

const ShieldSecurityIcon = (props: React.ComponentProps<typeof ShieldCheck>) => (
  <ShieldCheck size={24} {...props} />
);

const CreditCard= (props: React.ComponentProps<typeof MonitorSmartphone>) => (
    <MonitorSmartphone size={24} {...props} />
  );
  
  const Info = (props: React.ComponentProps<typeof ShieldCheck>) => (
    <ShieldCheck size={24} {...props} />
  );


  export default function StatsCard() {
    const statsData: StatItemData[] = [
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
     
         
      
        
        const statsData1: StatItemData[] = [
            {
              id: 'inventory',
              title: 'Total Assets',
              value: 11,
              icon: Box,
              color: 'blue',
              trend: { percentage: 200, period: 'from last month', isPositive: true},
              badge: 'Growing',
              description: 'Total Assets',
              statusData:{  active: 1,  inactive: 2,  notInUse: 3  } 
            },
          
          
            {
                id: 'inventory1',
                title: 'Total Value',
                value: 25000,
                icon: DollarSign,
                color: 'green',
                trend: { percentage: 200, period: 'from last month', isPositive: true},
              
                description: 'Total Assets',
                statusData:{  active: 0,  inactive: 2,  notInUse: 3  } 
              },
              {
                id: 'inventory2',
                title: 'Utilization',
                value: 0,
                icon: ShoppingCart,
                color: 'purple',
                trend: { percentage: 0, period: 'from last month', isPositive: true},
                badge: 'Growing',
                description: 'Total Assets',
                statusData:{  active: 1,  inactive: 2,  notInUse: 3  } 
              },
              {
                id: 'inventory3',
                title: 'maintainance',
                value: 0,
                icon: Building,
                color: 'orange',
                trend: { percentage: 0, period: 'from last month', isPositive: true},
                statusData:{  active: 1,  inactive: 2,  notInUse: 3  } 
              },
          ];
          const statsData2: StatItemData[] = [
            {
              id: 'inventory',
              title: 'Active Projects',
              value: 50,
              icon: Box,
              color: 'green',
             
            },
            {
                id: 'inventory1',
                title: 'completed',
                value: 5,
                icon: Wrench,
                color: 'blue',
               
              },
              {
                id: 'inventory2',
                title: 'At Risk',
                value: 7,
                icon: DollarSign,
                color: 'orange',
               
              },
              {
                id: 'inventory3',
                title: 'Active Projects',
                value: 92,
                icon: Activity,
                color: 'green',
               
              },
            
        ]
          


  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main Content */}
      <div className="py-8">
       
        
        <StatsContainer
          statsData={statsData}
          size="md"
          variant="default"
          columns={{ sm: 1, md: 2, lg: 4 }}
         
          animated={true}
          ariaLabel="Main dashboard statistics"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
          <StatsContainer
          statsData={statsData1}
          size="md"
          variant="default"
          columns={{ sm: 1, md: 2, lg: 4 }}
         
          animated={true}
          ariaLabel="Main dashboard statistics"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />
           <StatsContainer
          statsData={statsData2}
          size="md"
          variant="default"
          columns={{ sm: 1, md: 1, lg: 4 }}
         
          animated={true}
          ariaLabel="Main dashboard statistics"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        />

      </div>
    </div>
  );
      }