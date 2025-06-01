import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, DollarSign, ShoppingCart, Vote } from 'lucide-react';
import ChoresSummary from './ChoresSummary';
import ExpensesSummary from './ExpensesSummary';
import GroceriesSummary from './GroceriesSummary';
import PollsSummary from './PollsSummary';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Chores" 
          icon={<CheckSquare size={20} className="text-green-600" />}
          count={3}
          linkTo="/chores"
          color="bg-green-50"
        />
        <DashboardCard 
          title="Expenses" 
          icon={<DollarSign size={20} className="text-blue-600" />}
          count={2}
          linkTo="/expenses"
          color="bg-blue-50"
        />
        <DashboardCard 
          title="Groceries" 
          icon={<ShoppingCart size={20} className="text-orange-600" />}
          count={8}
          linkTo="/groceries"
          color="bg-orange-50"
        />
        <DashboardCard 
          title="Polls" 
          icon={<Vote size={20} className="text-purple-600" />}
          count={1}
          linkTo="/polls"
          color="bg-purple-50"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChoresSummary />
        <ExpensesSummary />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GroceriesSummary />
        <PollsSummary />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  linkTo: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, count, linkTo, color }) => {
  return (
    <Link to={linkTo} className="block">
      <div className={`${color} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {icon}
            <h3 className="ml-2 font-medium text-gray-800">{title}</h3>
          </div>
          <span className="text-2xl font-bold text-gray-800">{count}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {count === 1 ? '1 item' : `${count} items`} pending
        </p>
      </div>
    </Link>
  );
};

export default DashboardPage;