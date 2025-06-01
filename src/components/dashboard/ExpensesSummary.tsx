import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Plus } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesSummary: React.FC = () => {
  // Mock data - in a real app, this would come from Firebase
  const expenses = [
    { id: '1', title: 'Groceries', amount: 85.50, paidBy: 'Alex', date: '2025-05-10' },
    { id: '2', title: 'Utilities', amount: 120.75, paidBy: 'Jordan', date: '2025-05-05' },
  ];

  // Data for the doughnut chart
  const chartData = {
    labels: ['Groceries', 'Utilities', 'Rent', 'Internet'],
    datasets: [
      {
        data: [85.50, 120.75, 800, 60],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <DollarSign size={20} className="text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Expenses</h2>
        </div>
        <Link 
          to="/expenses" 
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          {expenses.map(expense => (
            <div 
              key={expense.id}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium text-gray-800">{expense.title}</h3>
                <p className="text-sm text-gray-600">Paid by: {expense.paidBy}</p>
              </div>
              <div>
                <span className="font-medium text-gray-800">${expense.amount.toFixed(2)}</span>
                <p className="text-xs text-gray-500 text-right">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          <Link 
            to="/expenses/new" 
            className="mt-2 flex items-center justify-center w-full py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-100"
          >
            <Plus size={16} className="mr-1" />
            Add New Expense
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="h-40 w-full relative">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">Monthly Expenses</p>
        </div>
      </div>
    </div>
  );
};

export default ExpensesSummary;