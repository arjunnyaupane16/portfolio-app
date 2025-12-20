import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Chandraprakash Nyaupane Portfolio',
        short_name: 'Chandraprakash',
        description: 'High-performance portfolio of MERN Stack and App Developer Chandraprakash Nyaupane.',
        start_url: '/',
        display: 'standalone',
        background_color: '#040404',
        theme_color: '#6366f1',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
