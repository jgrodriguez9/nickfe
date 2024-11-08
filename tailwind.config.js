/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const primary = {
  DEFAULT: "rgb(var(--color-primary-DEFAULT) / <alpha-value>)",
  50: "rgb(var(--color-primary-50) / <alpha-value>)",
  100: "rgb(var(--color-primary-100) / <alpha-value>)",
  200: "rgb(var(--color-primary-200) / <alpha-value>)",
  300: "rgb(var(--color-primary-300) / <alpha-value>)",
  400: "rgb(var(--color-primary-400) / <alpha-value>)",
  500: "rgb(var(--color-primary-500) / <alpha-value>)",
  600: "rgb(var(--color-primary-600) / <alpha-value>)",
  700: "rgb(var(--color-primary-700) / <alpha-value>)",
  800: "rgb(var(--color-primary-800) / <alpha-value>)",
  900: "rgb(var(--color-primary-900) / <alpha-value>)",
  950: "rgb(var(--color-primary-950) / <alpha-value>)",
};

const secondary = {
  DEFAULT: "rgb(var(--color-secondary-DEFAULT) / <alpha-value>)",
  50: "rgb(var(--color-secondary-50) / <alpha-value>)",
  100: "rgb(var(--color-secondary-100) / <alpha-value>)",
  200: "rgb(var(--color-secondary-200) / <alpha-value>)",
  300: "rgb(var(--color-secondary-300) / <alpha-value>)",
  400: "rgb(var(--color-secondary-400) / <alpha-value>)",
  500: "rgb(var(--color-secondary-500) / <alpha-value>)",
  600: "rgb(var(--color-secondary-600) / <alpha-value>)",
  700: "rgb(var(--color-secondary-700) / <alpha-value>)",
  800: "rgb(var(--color-secondary-800) / <alpha-value>)",
  900: "rgb(var(--color-secondary-900) / <alpha-value>)",
  950: "rgb(var(--color-secondary-950) / <alpha-value>)",
};

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Visa Dialect", "sans-serif", ...defaultTheme.fontFamily.sans],
      "noto-sans": "Noto Sans",
    },
    extend: {
      colors: {
        site: {
          primary: primary,
          secondary: secondary,
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
