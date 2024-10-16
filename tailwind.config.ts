import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./library/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightMode: {
          brand: {
            primary: '#FF5722',
            secondary: '#F5F5F5',
            accent: '#EB5017'
          },
          background: {
            main: '#FFFFFF',
            secondary: '#f3f4f6',
            alternate: '#F9FAFC'
          },
          text: {
            main: '#5F6D7E',
            heading: '#272D37',
            accent: '#EB5017'
          },
          button: {
            background: '#EB5017',
            text: '#FFFFFF'
          }
        },
        darkMode: {
          brand: {
            primary: '#FFA726',
            secondary: '#212121',
            accent: '#FF7043'
          },
          background: {
            main: '#181818',
            secondary: '#101010',
            alternate: '#0A0909'
          },
          text: {
            main: '#E0E0E0',
            heading: '#FFFFFF',
            accent: '#FF7043'
          },
          button: {
            background: '#FF7043',
            text: '#FFFFFF'
          }
        }
      },
    },
  },
  plugins: [],
};

export default config;
