import { useState } from "react";

const CollaborationDemo = () => {
  const [activeUsers, setActiveUsers] = useState([
    { name: 'Sarah (Designer)', color: 'bg-pink-500', action: 'editing header' },
    { name: 'Mike (Developer)', color: 'bg-blue-500', action: 'optimizing code' },
    { name: 'Lisa (Content)', color: 'bg-green-500', action: 'writing blog posts' }
  ])
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <h3 className="font-bold mb-4">👥 Live Collaboration</h3>
      <div className="space-y-3">
        {activeUsers.map((user, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${user.color} animate-pulse`} />
            <span className="text-sm">
              <strong>{user.name}</strong> is {user.action}...
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollaborationDemo;