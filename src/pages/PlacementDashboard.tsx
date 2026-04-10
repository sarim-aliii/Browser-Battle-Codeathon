import { useState } from 'react';

interface ApplicationPrep {
  id: string;
  company: string;
  type: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  materialsLink?: string;
}

interface DeadlineAlert {
  id: string;
  title: string;
  date: string;
  isUrgent: boolean;
}

export default function PlacementDashboard() {
  // Example state for tracking technical interview prep and application windows
  const [prepTracker, setPrepTracker] = useState<ApplicationPrep[]>([
    {
      id: '1',
      company: 'Amazon',
      type: 'Internship Exam',
      status: 'Completed',
    },
    {
      id: '2',
      company: 'JP Morgan',
      type: 'Technical Interview',
      status: 'In Progress',
    }
  ]);

  // Example state for automated reminders and crucial dates
  const [alerts, setAlerts] = useState<DeadlineAlert[]>([
    {
      id: 'a1',
      title: 'Main Internship Portal Opens',
      date: '2026-05-04',
      isUrgent: true,
    }
  ]);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Placement & Opportunities</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your technical prep and upcoming deadlines.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tracking Windows & Prep */}
        <div className="col-span-2 space-y-6">
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Application & Prep Tracker</h2>
            <div className="space-y-4">
              {prepTracker.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-750 rounded-md">
                  <div>
                    <h3 className="font-medium text-lg">{item.company}</h3>
                    <span className="text-sm text-gray-500">{item.type}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
              + Add New Application or Prep Material
            </button>
          </section>
        </div>

        {/* Right Column: Automated Alerts */}
        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Crucial Alerts
              <span className="ml-2 flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h2>
            
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-md border-l-4 ${alert.isUrgent ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-blue-500 bg-blue-50'}`}>
                  <div className="flex justify-between items-start">
                    <h4 className={`font-medium ${alert.isUrgent ? 'text-red-800 dark:text-red-200' : ''}`}>{alert.title}</h4>
                  </div>
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">Date: {new Date(alert.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}