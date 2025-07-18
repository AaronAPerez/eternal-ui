const ProgressBar = ({ label, wordpress, eternal }: { 
  label: string, 
  wordpress: number, 
  eternal: number 
}) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <span className="font-medium">{label}</span>
      <span className="text-sm text-gray-600">{eternal}% improvement</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
        style={{ width: `${eternal}%` }}
      />
    </div>
  </div>
)