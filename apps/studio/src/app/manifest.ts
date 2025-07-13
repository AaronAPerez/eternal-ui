import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Eternal UI - Visual Website Builder',
    short_name: 'Eternal UI',
    description: 'AI-powered visual website builder with code export',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'developer', 'design'],
    shortcuts: [
      {
        name: 'Start Building',
        short_name: 'Build',
        description: 'Open the visual builder',
        url: '/builder',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }]
      },
      {
        name: 'View Demos',
        short_name: 'Demos',
        description: 'See interactive demos',
        url: '/demos',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }]
      }
    ]
  }
}