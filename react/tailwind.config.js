/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "brand-blue": "#71a5be",
                "brand-hover-blue": "#325e74",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
