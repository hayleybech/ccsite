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
        fontFamily: {'sans': 'DM Sans, Arial, Helvetica, sans-serif'},
        extend: {
            fontFamily: {'heading': 'Manrope, Arial, Helvetica, sans-serif'},
            colors: {
                'brand-off-white': '#f2f1f3',
            }
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
    ],
};
