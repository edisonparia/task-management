/** @type {import('tailwindcss').Config} */

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
    if (key.startsWith(`VITE_`)) {
        viteEnv[`import.meta.env.${key}`] = process.env[key]
    }
})
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    1: 'var(--color-primary-1)',
                    2: 'var(--color-primary-2)',
                    3: 'var(--color-primary-3)',
                    4: 'var(--color-primary-4)',
                    5: 'var(--color-primary-5)',
                },
                secondary: {
                    1: 'var(--color-secondary-1)',
                    2: 'var(--color-secondary-2)',
                    3: 'var(--color-secondary-3)',
                    4: 'var(--color-secondary-4)',
                    5: 'var(--color-secondary-5)',
                },
                tertiary: {
                    1: 'var(--color-tertiary-1)',
                    2: 'var(--color-tertiary-2)',
                    3: 'var(--color-tertiary-3)',
                    4: 'var(--color-tertiary-4)',
                    5: 'var(--color-tertiary-5)',
                },
                neutral: {
                    1: 'var(--color-neutral-1)',
                    2: 'var(--color-neutral-2)',
                    3: 'var(--color-neutral-3)',
                    4: 'var(--color-neutral-4)',
                    5: 'var(--color-neutral-5)',
                },
            },
            fontSize: {
                'display-xl': [
                    '64px',
                    { lineHeight: '88px', letterSpacing: '1px' },
                ],
                'display-l': [
                    '56px',
                    { lineHeight: '72px', letterSpacing: '1px' },
                ],
                'display-m': [
                    '48px',
                    { lineHeight: '56px', letterSpacing: '1px' },
                ],
                'display-s': [
                    '32px',
                    { lineHeight: '48px', letterSpacing: '1px' },
                ],
                'display-xs': [
                    '24px',
                    { lineHeight: '32px', letterSpacing: '1px' },
                ],
                'body-xl': [
                    '20px',
                    { lineHeight: '32px', letterSpacing: '0.75px' },
                ],
                'body-l': [
                    '18px',
                    { lineHeight: '32px', letterSpacing: '0.75px' },
                ],
                'body-m': [
                    '15px',
                    { lineHeight: '24px', letterSpacing: '0.75px' },
                ],
                'body-s': [
                    '13px',
                    { lineHeight: '22px', letterSpacing: '0.25px' },
                ],
            },
            fontFamily: {
                heading: ['sans-serif', 'Times New Roman', 'Georgia', 'Roboto'],
                body: ['sans-serif', 'Times New Roman', 'Georgia', 'Roboto'],
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
    define: viteEnv,
}
