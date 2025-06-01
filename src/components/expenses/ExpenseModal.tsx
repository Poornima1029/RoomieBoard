import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface ExpenseModalProps {
  onClose: () => void;
  editExpense?: {
    id: string;
    title: string;
    amount: number;
    paidBy: string;
    splitBetween: {
      userId: string;
      name: string;
      amount: number;
      paid: boolean;
    }[];
  };
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ onClose, editExpense }) => {
  const [title, setTitle] = useState(editExpense?.title || '');
  const [amount, setAmount] = useState(editExpense?.amount.toString() || '');
  const [paidBy, setPaidBy] = useState(editExpense?.paidBy || '');
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [receipt, setReceipt] = useState<File | null>(null);
  
  // Mock roommates - in a real app, this would come from Firebase
  const roommates = [
    { id: '1', name: 'Alex', selected: true, amount: '' },
    { id: '2', name: 'Jordan', selected: true, amount: '' },
    { id: '3', name: 'Taylor', selected: true, amount: '' },
  ];

  const [selectedRoommates, setSelectedRoommates] = useState(
    editExpense?.splitBetween.map(split => ({
      id: split.userId,
      name: split.name,
      selected: true,
      amount: split.amount.toString()
    })) || roommates
  );

  const handleRoommateToggle = (id: string) => {
    setSelectedRoommates(prev => 
      prev.map(roommate => 
        roommate.id === id 
          ? { ...roommate, selected: !roommate.selected } 
          : roommate
      )
    );
  };

  const handleAmountChange = (id: string, value: string) => {
    setSelectedRoommates(prev => 
      prev.map(roommate => 
        roommate.id === id 
          ? { ...roommate, amount: value } 
          : roommate
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate split amounts
    let splitRoommates = selectedRoommates.filter(r => r.selected);
    
    if (splitType === 'equal' && splitRoommates.length > 0) {
      const splitAmount = parseFloat(amount) / splitRoommates.length;
      splitRoommates = splitRoommates.map(r => ({
        ...r,
        amount: splitAmount.toFixed(2)
      }));
    }
    
    // In a real app, this would save to Firebase
    console.log({
      title,
      amount: parseFloat(amount),
      paidBy,
      splitBetween: splitRoommates.map(r => ({
        userId: r.id,
        name: r.name,
        amount: parseFloat(r.amount || '0'),
        paid: r.name === paidBy // Automatically mark as paid for the person who paid
      })),
      receipt
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {editExpense ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter expense title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700 mb-1">
              Paid By
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select who paid</option>
              {roommates.map(roommate => (
                <option key={roommate.id} value={roommate.name}>
                  {roommate.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Split Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="splitType"
                  checked={splitType === 'equal'}
                  onChange={() => setSplitType('equal')}
                />
                <span className="ml-2">Equal</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="splitType"
                  checked={splitType === 'custom'}
                  onChange={() => setSplitType('custom')}
                />
                <span className="ml-2">Custom</span>
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Split Between
            </label>
            <div className="space-y-2 border border-gray-200 rounded-md p-3">
              {selectedRoommates.map(roommate => (
                <div key={roommate.id} className="flex items-center justify-between">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={roommate.selected}
                      onChange={() => handleRoommateToggle(roommate.id)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{roommate.name}</span>
                  </label>
                  
                  {splitType === 'custom' && roommate.selected && (
                    <div className="relative w-24">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-xs">$</span>
                      </div>
                      <input
                        type="number"
                        value={roommate.amount}
                        onChange={(e) => handleAmountChange(roommate.id, e.target.value)}
                        className="w-full pl-5 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Receipt (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload size={24} className="mx-auto text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="receipt"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="receipt"
                      name="receipt"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {receipt && (
                  <p className="text-xs text-green-500">
                    Selected: {receipt.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editExpense ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;