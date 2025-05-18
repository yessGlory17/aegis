"use client";
import { createTheme } from "@mui/material";

// Renk ailesi tipi
interface ExtendedColor {
  900: string;
  800: string;
  700: string;
  600: string;
  500: string;
  400: string;
  300: string;
  200: string;
  100: string;
  50: string;
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

// MUI tip genişletmesi
declare module "@mui/material/styles" {
  interface Palette {
    gray: ExtendedColor;
    blue: ExtendedColor;
    red: ExtendedColor;
    orange: ExtendedColor;
    yellow: ExtendedColor;
    green: ExtendedColor;
    teal: ExtendedColor;
    indigo: ExtendedColor;
    purple: ExtendedColor;
    pink: ExtendedColor;
  }

  interface PaletteOptions {
    gray?: Partial<ExtendedColor>;
    blue?: Partial<ExtendedColor>;
    red?: Partial<ExtendedColor>;
    orange?: Partial<ExtendedColor>;
    yellow?: Partial<ExtendedColor>;
    green?: Partial<ExtendedColor>;
    teal?: Partial<ExtendedColor>;
    indigo?: Partial<ExtendedColor>;
    purple?: Partial<ExtendedColor>;
    pink?: Partial<ExtendedColor>;
  }
}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        background:{
            default:"#fff",
            paper:"#fff"
        },
        primary: {
          main: "#4f46e5",
        },
        gray: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
          main: "#64748b",
        },
        blue: {
          900: "#1e3a8a",
          800: "#1e40af",
          700: "#1d4ed8",
          600: "#2563eb",
          500: "#3b82f6",
          400: "#60a5fa",
          300: "#93c5fd",
          200: "#bfdbfe",
          100: "#dbeafe",
          50: "#eff6ff",
          main: "#3b82f6",
        },
        red: {
          900: "#7f1d1d",
          800: "#991b1b",
          700: "#b91c1c",
          600: "#dc2626",
          500: "#ef4444",
          400: "#f87171",
          300: "#fca5a5",
          200: "#fecaca",
          100: "#fee2e2",
          50: "#fef2f2",
          main: "#ef4444",
        },
        orange: {
          900: "#7c2d12",
          800: "#9a3412",
          700: "#c2410c",
          600: "#ea580c",
          500: "#f97316",
          400: "#fb923c",
          300: "#fdba74",
          200: "#fed7aa",
          100: "#ffedd5",
          50: "#fff7ed",
          main: "#f97316",
        },
        yellow: {
          900: "#78350f",
          800: "#92400e",
          700: "#b45309",
          600: "#d97706",
          500: "#f59e0b",
          400: "#fbbf24",
          300: "#fcd34d",
          200: "#fde68a",
          100: "#fef3c7",
          50: "#fffbeb",
          main: "#f59e0b",
        },
        green: {
          900: "#064e3b",
          800: "#065f46",
          700: "#047857",
          600: "#059669",
          500: "#10b981",
          400: "#34d399",
          300: "#6ee7b7",
          200: "#a7f3d0",
          100: "#d1fae5",
          50: "#ecfdf5",
          main: "#10b981",
        },
        teal: {
          900: "#134e4a",
          800: "#115e59",
          700: "#0f766e",
          600: "#0d9488",
          500: "#14b8a6",
          400: "#2dd4bf",
          300: "#5eead4",
          200: "#99f6e4",
          100: "#ccfbf1",
          50: "#f0fdfa",
          main: "#14b8a6",
        },
        indigo: {
          900: "#312e81",
          800: "#3730a3",
          700: "#4338ca",
          600: "#4f46e5",
          500: "#6366f1",
          400: "#818cf8",
          300: "#a5b4fc",
          200: "#c7d2fe",
          100: "#e0e7ff",
          50: "#eef2ff",
          main: "#6366f1",
        },
        purple: {
          900: "#581c87",
          800: "#6b21a8",
          700: "#7e22ce",
          600: "#9333ea",
          500: "#a855f7",
          400: "#c084fc",
          300: "#d8b4fe",
          200: "#e9d5ff",
          100: "#f3e8ff",
          50: "#faf5ff",
          main: "#a855f7",
        },
        pink: {
          900: "#831843",
          800: "#9d174d",
          700: "#be185d",
          600: "#db2777",
          500: "#ec4899",
          400: "#f472b6",
          300: "#f9a8d4",
          200: "#fbcfe8",
          100: "#fce7f3",
          50: "#fdf4ff",
          main: "#ec4899",
        },
      },
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 6,
          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 8,
            boxShadow:"0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
            textTransform:"none",
            minHeight:40
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            border: `1px solid ${theme.palette.grey["200"]}`,
            backgroundColor: theme.palette.grey["50"],
            borderRadius: 8,
          },
        }),
      },
    },
    // MuiList:{
    //     styleOverrides:{
    //         root:({ theme }) => ({
    //             // border:`1px solid ${theme.palette.gray['200']}`,
    //             // backgroundColor: theme.palette.background.paper,
    //             // borderRadius: 8,
    //             // boxShadow:"0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
    //             "& > :not(:last-child)":{
    //                 borderBottom:`1px solid ${theme.palette.grey['200']}`
    //             }
    //         })
    //     }
    // }
  },
});

export default theme;
