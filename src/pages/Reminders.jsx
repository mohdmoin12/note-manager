import { useState, useEffect } from 'react';
import { Bell, Plus, Calendar, Clock, Trash, Edit, Check } from 'lucide-react';

export default function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 1, title: "Review project proposal", date: "2025-04-10", time: "09:00", completed: false },
    { id: 2, title: "Team meeting", date: "2025-04-09", time: "14:30", completed: false },
    { id: 3, title: "Submit expense report", date: "2025-04-12", time: "17:00", completed: true }
  ]);
  
  const [newReminder, setNewReminder] = useState({
    title: "",
    date: "",
    time: ""
  });
  
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  // Add a new reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title || !newReminder.date || !newReminder.time) return;
    
    const reminder = {
      id: Date.now(),
      title: newReminder.title,
      date: newReminder.date,
      time: newReminder.time,
      completed: false
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({ title: "", date: "", time: "" });
  };
  
  // Delete a reminder
  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };
  
  // Toggle completion status
  const toggleComplete = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? {...reminder, completed: !reminder.completed} : reminder
    ));
  };
  
  // Start editing a reminder
  const startEditing = (reminder) => {
    setIsEditing(reminder.id);
    setEditForm({...reminder});
  };
  
  // Save edited reminder
  const saveEdit = () => {
    if (!editForm.title || !editForm.date || !editForm.time) return;
    
    setReminders(reminders.map(reminder => 
      reminder.id === isEditing ? {...editForm} : reminder
    ));
    setIsEditing(null);
  };
  
  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2" size={24} />
          Reminders
        </h1>
      </div>
      
      {/* Add Reminder Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Plus size={18} className="mr-2" />
          Create New Reminder
        </h2>
        <form onSubmit={handleAddReminder} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded-md"
              placeholder="What do you need to remember?"
              value={newReminder.title}
              onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1 flex items-center">
                <Calendar size={14} className="mr-1" />
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full p-2 border rounded-md"
                value={newReminder.date}
                onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1 flex items-center">
                <Clock size={14} className="mr-1" />
                Time
              </label>
              <input
                type="time"
                id="time"
                className="w-full p-2 border rounded-md"
                value={newReminder.time}
                onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Set Reminder
          </button>
        </form>
      </div>
      
      {/* Reminders List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Your Reminders</h2>
          <p className="text-sm text-gray-500">Manage your scheduled reminders</p>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {reminders.length === 0 ? (
            <li className="p-6 text-center text-gray-500">No reminders set. Create one above!</li>
          ) : (
            reminders.map(reminder => (
              <li key={reminder.id} className={`p-4 flex items-center hover:bg-gray-50 ${reminder.completed ? 'bg-gray-50' : ''}`}>
                {isEditing === reminder.id ? (
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    />
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        className="flex-1 p-2 border rounded-md"
                        value={editForm.date}
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      />
                      <input
                        type="time"
                        className="flex-1 p-2 border rounded-md"
                        value={editForm.time}
                        onChange={(e) => setEditForm({...editForm, time: e.target.value})}
                      />
                      <button 
                        onClick={saveEdit}
                        className="p-2 bg-green-500 text-white rounded-md"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => toggleComplete(reminder.id)}
                      className={`w-5 h-5 rounded-full border flex-shrink-0 mr-3 ${reminder.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                    >
                      {reminder.completed && <Check size={14} className="text-white m-auto" />}
                    </button>
                    
                    <div className={`flex-1 ${reminder.completed ? 'line-through text-gray-500' : ''}`}>
                      <h3 className="font-medium">{reminder.title}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(reminder.date)} at {reminder.time}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEditing(reminder)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="p-2 text-red-500 hover:bg-gray-100 rounded-full"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}