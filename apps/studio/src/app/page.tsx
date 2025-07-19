// app/studio/page.tsx



export default function StudioPage() {
  return (
    <div className="h-screen">
      <VisualBuilder
        className="w-full h-full"
        initialElements={[]}
      />
    </div>
  )
}
// // src/app/page.tsx
// import Link from 'next/link'
// import { ArrowRight, Zap, Shield, BarChart } from 'lucide-react'
import VisualBuilder from '../../../../packages/studio/components/VisualBuilder/VisualBuilder';

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <div className="max-w-4xl mx-auto text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Eternal UI Studio</h1>
//         <p className="text-lg text-gray-600 mb-8">Visual website builder</p>
        
//         {/* Migration Demo Card */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl mb-8">
//           <h2 className="text-2xl font-bold mb-4">WordPress Migration Tool</h2>
//           <p className="text-gray-600 mb-6">
//             Transform your WordPress site into a modern, lightning-fast React application
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="text-center">
//               <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
//               <h3 className="font-semibold">10x Faster</h3>
//               <p className="text-sm text-gray-600">Lightning-fast loading</p>
//             </div>
//             <div className="text-center">
//               <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
//               <h3 className="font-semibold">Secure</h3>
//               <p className="text-sm text-gray-600">No vulnerabilities</p>
//             </div>
//             <div className="text-center">
//               <BarChart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
//               <h3 className="font-semibold">90% Cheaper</h3>
//               <p className="text-sm text-gray-600">Reduced hosting costs</p>
//             </div>
//           </div>
          
//           <Link 
//             href="/migration"
//             className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
//           >
//             <span>Try Migration Demo</span>
//             <ArrowRight className="w-5 h-5" />
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }