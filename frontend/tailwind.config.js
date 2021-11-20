module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./containers/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                fly: "fly 1s",
            },
            keyframes: {
                fly: {
                    "0%": {
                        transform: "translateY(50px)",
                        opacity: "0",
                    },
                    "100%": {
                        transform: "translateY(0)",
                        opacity: "1",
                    },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};