import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1D8C84', // Blend of #39B549 (green) & #0070BC (blue)
                primaryLight: '#39B549',
                primaryDark: '#0070BC',
                secondary: '#F4F4F4',
                accent: '#FF9800',
                textPrimary: '#222',
                textSecondary: '#555',
            },
        },
    },
    plugins: [],
};

export default config;
