import React, { useState } from 'react';
import { Plus, Filter, DollarSign, User, Calendar, Receipt } from 'lucide-react';
import ExpenseModal from './ExpenseModal';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'mine' | 'owed' | 'paid'>('all');
  
  // Mock data - in a real app, this would come from Firebase
  const expenses = [
    { 
      id: '1', 
      title: 'Groceries', 
      amount: 85.50, 
      paidBy: 'Alex',
      createdAt: '2025-05-10T15:30:00',
      receiptURL: 'https://example.com/receipt1.jpg',
      splitBetween: [
        { userId: '1', name: 'Alex', amount: 28.50, paid: true },
        { userId: '2', name: 'Jordan', amount: 28.50, paid: false },
        { userId: '3', name: 'Taylor', amount: 28.50, paid: false },
      ]
    },
    { 
      id: '2', 
      title: 'Utilities', 
      amount: 120.75, 
      paidBy: 'Jordan',
      createdAt: '2025-05-05T09:15:00',
      receiptURL: 'https://example.com/receipt2.jpg',
      splitBetween: [
        { userId: '1', name: 'Alex', amount: 40.25, paid: false },
        { userId: '2', name: 'Jordan', amount: 40.25, paid: true },
        { userId: '3', name: 'Taylor', amount: 40.25, paid: true },
      ]
    },
  ];

  // Filter expenses based on selected filter
  const filteredExpenses = expenses.filter(expense => {
    if (filter === 'all') return true;
    if (filter === 'mine') return expense.paidBy === 'Alex'; // In a real app, use currentUser.displayName
    if (filter === 'owed') {
      const userShare = expense.splitBetween.find(split => split.name === 'Alex');
      return userShare && !userShare.paid && expense.paidBy !== 'Alex';
    }
    if (filter === 'paid') {
      const userShare = expense.splitBetween.find(split => split.name === 'Alex');
      return userShare && userShare.paid;
    }
    return true;
  });

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
        position: 'right' as const,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Expense
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Filters</h2>
            </div>
          </div>
          
          <div className="p-4 flex flex-wrap gap-2">
            <FilterButton 
              label="All Expenses" 
              active={filter === 'all'} 
              onClick={() => setFilter('all')} 
            />
            <FilterButton 
              label="Paid by Me" 
              active={filter === 'mine'} 
              onClick={() => setFilter('mine')} 
            />
            <FilterButton 
              label="I Owe" 
              active={filter === 'owed'} 
              onClick={() => setFilter('owed')} 
            />
            <FilterButton 
              label="Paid" 
              active={filter === 'paid'} 
              onClick={() => setFilter('paid')} 
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Monthly Breakdown</h2>
          <div className="h-48">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <DollarSign size={18} className="text-blue-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Expense List</h2>
          </div>
        </div>
        
        {filteredExpenses.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredExpenses.map(expense => (
              <div key={expense.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{expense.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Paid by {expense.paidBy} on {new Date(expense.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    ${expense.amount.toFixed(2)}
                  </span>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Split Details:</h4>
                  <div className="space-y-2">
                    {expense.splitBetween.map(split => (
                      <div key={split.userId} className="flex justify-between items-center">
                        <span className="text-sm">{split.name}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">${split.amount.toFixed(2)}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            split.paid 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {split.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    <Receipt size={14} className="mr-1" />
                    View Receipt
                  </button>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Edit
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <DollarSign size={40} className="mx-auto mb-4 text-gray-300" />
            <p>No expenses found matching your filters</p>
          </div>
        )}
      </div>
      
      {showModal && <ExpenseModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm ${
        active 
          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default ExpensesPage;