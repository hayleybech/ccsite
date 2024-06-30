/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.antlers.html',
        './resources/**/*.antlers.php',
        './resources/**/*.blade.php',
        './resources/**/*.vue',
        './content/**/*.md',
    ],

    theme: {
        fontFamily: {'sans': 'Inter, Arial, Helvetica, sans-serif'},
        extend: {
            colors: {
                'brand-purple-dark': '#200142',
                'brand-off-white': '#f2f1f3',
            }
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
