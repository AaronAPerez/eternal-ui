import { FeatureFlagAdmin } from "./FeatureFlagAdmin";


export function DevTools() {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <details className="bg-white border border-gray-300 rounded-lg shadow-lg">
        <summary className="p-3 cursor-pointer">🚀 Dev Tools</summary>
        <div className="p-4 border-t">
          <FeatureFlagAdmin />
        </div>
      </details>
    </div>
  );
}