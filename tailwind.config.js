/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7c3aed',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
                neon: {
                    purple: '#c026d3',
                    pink: '#ec4899',
                    blue: '#06b6d4',
                    green: '#10b981',
                },
                dark: {
                    900: '#0f0f23',
                    800: '#1a1a2e',
                    700: '#16213e',
                    600: '#0f3460',
                },
                blood: {
                    100: '#ef4444',
                    200: '#dc2626',
                    300: '#b91c1c'
                },
                glitch: {
                    blood: '#ff6b6b',
                    sky: '#4ecdc4',
                    neon: '#ff00ff'
                }
            },
            fontFamily: {
                'cyber': ['Orbitron', 'monospace'],
                'tech': ['Share Tech Mono', 'monospace'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'text-shimmer': 'text-shimmer 2s ease-in-out infinite alternate',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': {
                        boxShadow: '0 0 5px #a855f7, 0 0 10px #a855f7'
                    },
                    '50%': {
                        boxShadow: '0 0 20px #c084fc, 0 0 30px #c084fc'
                    }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'text-shimmer': {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' }
                }
            }
        },
    },
    plugins: [],
}