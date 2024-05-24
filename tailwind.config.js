/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            // Use more custom classes here
            colors: {
                teal: {
                    500: '#169fa7',
                },
            },
        },
    },
    plugins: [],
};
