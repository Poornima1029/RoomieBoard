export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  role: 'admin' | 'member';
}

export interface Room {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  adminId: string;
}

export interface Chore {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  createdAt: string;
  receiptURL?: string;
  splitBetween: {
    userId: string;
    amount: number;
    paid: boolean;
  }[];
}

export interface GroceryItem {
  id: string;
  name: string;
  addedBy: string;
  addedAt: string;
  bought: boolean;
  boughtBy?: string;
  boughtAt?: string;
}

export interface Poll {
  id: string;
  question: string;
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  options: {
    id: string;
    text: string;
    votes: string[]; // array of user IDs
  }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  type: 'task' | 'payment' | 'birthday' | 'other';
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  readBy: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  type: 'chore' | 'expense' | 'grocery' | 'poll' | 'event' | 'chat';
  linkTo: string;
}