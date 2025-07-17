export const ComponentInspector = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        setIsVisible(!isVisible);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <h3 className="font-semibold mb-2">Component Inspector</h3>
      <div className="text-sm text-gray-600">
        <p>Components loaded: {componentRegistry.length}</p>
        <p>Active route: {window.location.pathname}</p>
        <p>Theme: Indigo</p>
      </div>
    </div>
  );
};