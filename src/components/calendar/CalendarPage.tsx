import React, { useState } from 'react';
import { Calendar, Plus, Filter } from 'lucide-react';
import CalendarEventModal from './CalendarEventModal';

const CalendarPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'tasks' | 'payments' | 'birthdays' | 'other'>('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Mock data - in a real app, this would come from Firebase
  const events = [
    { 
      id: '1', 
      title: 'Pay Rent', 
      description: 'Monthly rent payment',
      startDate: '2025-05-01T09:00:00',
      endDate: '2025-05-01T10:00:00',
      createdBy: 'Alex',
      type: 'payment' as const
    },
    { 
      id: '2', 
      title: 'Deep Clean', 
      description: 'Monthly deep cleaning of the apartment',
      startDate: '2025-05-15T14:00:00',
      endDate: '2025-05-15T17:00:00',
      createdBy: 'Jordan',
      type: 'task' as const
    },
    { 
      id: '3', 
      title: 'Taylor\'s Birthday', 
      description: 'Celebrate Taylor\'s birthday',
      startDate: '2025-05-20T18:00:00',
      endDate: '2025-05-20T22:00:00',
      createdBy: 'Jordan',
      type: 'birthday' as const
    },
    { 
      id: '4', 
      title: 'House Meeting', 
      description: 'Discuss apartment issues and plans',
      startDate: '2025-05-10T19:00:00',
      endDate: '2025-05-10T20:00:00',
      createdBy: 'Alex',
      type: 'other' as const
    },
  ];

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.type === filter;
  });

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total days in the month
    const daysInMonth = lastDay.getDate();
    
    // Generate array of days
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    if (!date) return [];
    
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format date to display month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Event
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Filters</h2>
          </div>
        </div>
        
        <div className="p-4 flex flex-wrap gap-2">
          <FilterButton 
            label="All Events" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')} 
          />
          <FilterButton 
            label="Tasks" 
            active={filter === 'tasks'} 
            onClick={() => setFilter('tasks')} 
          />
          <FilterButton 
            label="Payments" 
            active={filter === 'payments'} 
            onClick={() => setFilter('payments')} 
          />
          <FilterButton 
            label="Birthdays" 
            active={filter === 'birthdays'} 
            onClick={() => setFilter('birthdays')} 
          />
          <FilterButton 
            label="Other" 
            active={filter === 'other'} 
            onClick={() => setFilter('other')} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <button
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <h2 className="text-lg font-medium text-gray-800">
              {formatMonthYear(currentMonth)}
            </h2>
            
            <button
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day, index) => {
                if (!day) {
                  return (
                    <div key={`empty-${index}`} className="bg-white p-2 h-24"></div>
                  );
                }
                
                const dayEvents = getEventsForDay(day);
                const isToday = new Date().toDateString() === day.toDateString();
                const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
                
                return (
                  <div 
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`bg-white p-2 h-24 overflow-hidden cursor-pointer border ${
                      isSelected ? 'border-blue-500' : isToday ? 'border-green-500' : 'border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-green-600' : 'text-gray-700'
                      }`}>
                        {day.getDate()}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div 
                          key={event.id}
                          className={`text-xs truncate px-1 py-0.5 rounded ${
                            event.type === 'task' ? 'bg-green-100 text-green-800' :
                            event.type === 'payment' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'birthday' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.title}
                        </div>
                      ))}
                      
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 pl-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            {selectedDate 
              ? `Events on ${selectedDate.toLocaleDateString()}`
              : 'Upcoming Events'
            }
          </h2>
          
          {selectedDate ? (
            <div>
              {getEventsForDay(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDay(selectedDate).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar size={40} className="mx-auto mb-4 text-gray-300" />
                  <p>No events on this day</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Add an event
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                .slice(0, 5)
                .map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          )}
        </div>
      </div>
      
      {showModal && (
        <CalendarEventModal 
          onClose={() => setShowModal(false)} 
          initialDate={selectedDate}
        />
      )}
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

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    type: 'task' | 'payment' | 'birthday' | 'other';
    createdBy: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  
  return (
    <div className={`p-3 rounded-md ${
      event.type === 'task' ? 'bg-green-50 border-l-4 border-green-500' :
      event.type === 'payment' ? 'bg-blue-50 border-l-4 border-blue-500' :
      event.type === 'birthday' ? 'bg-purple-50 border-l-4 border-purple-500' :
      'bg-gray-50 border-l-4 border-gray-500'
    }`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{event.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          event.type === 'task' ? 'bg-green-100 text-green-800' :
          event.type === 'payment' ? 'bg-blue-100 text-blue-800' :
          event.type === 'birthday' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      
      <div className="mt-2 text-xs text-gray-500">
        <div>
          {startDate.toLocaleDateString()} • {formatTime(startDate)} - {formatTime(endDate)}
        </div>
        <div>Added by {event.createdBy}</div>
      </div>
    </div>
  );
};

export default CalendarPage;