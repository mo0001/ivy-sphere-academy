/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#083858",
          deep: "#041E30",
          mid: "#0C4A6E",
          muted: "#3D5F73",
        },
        sky: {
          DEFAULT: "#78D0E8",
          bright: "#5BC4E0",
          light: "#C8ECF6",
          soft: "#F4FBFD",
          mist: "#E7F6FB",
        },
        sage: {
          DEFAULT: "#3F7A68",
          light: "#E7F3EE",
        },
        gold: {
          DEFAULT: "#C4A35A",
          light: "#F6EFD9",
        },
      },
      fontFamily: {
        serif: ["Source Serif 4", "Georgia", "serif"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 16px 40px -24px rgba(8, 56, 88, 0.25)",
        lift: "0 22px 50px -20px rgba(8, 56, 88, 0.2)",
      },
    },
  },
  plugins: [],
};
