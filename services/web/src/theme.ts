import { createContext, useState, useMemo } from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { useLocalStorage } from "./hooks/useLocalStorage"
interface IColorSchema {
    green: {
        [key: number]: string
    },
    gray: {
        [key: number]: string
    },
    red: {
        [key: number]: string
    },
    primary: {
        [key: number]: string
    },
    indigo: {
        [key: number]: string
    }

}
type ThemeMode = "light" | "dark"



export const tokens = (mode: string): IColorSchema => {
    return (mode === "dark" ? {

        green: {
            100: "#dbf5ee",
            200: "#b7ebde",
            300: "#94e2cd",
            400: "#70d8bd",
            500: "#4cceac",
            600: "#3da58a",
            700: "#2e7c67",
            800: "#1e5245",
            900: "#0f2922"
        },
        primary: {
            100: "#d0d5d1",
            200: "#a1aba4",
            300: "#728176",
            400: "#435749",
            500: "#142d1b",
            600: "#102416",
            700: "#0c1b10",
            800: "#08120b",
            900: "#040905"
        },

        gray: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414"
        },

        red: {
            100: "#f9d5d7",
            200: "#f2abaf",
            300: "#ec8288",
            400: "#e55860",
            500: "#df2e38",
            600: "#b2252d",
            700: "#861c22",
            800: "#591216",
            900: "#2d090b"
        },
        indigo: {
            100: "#e6e6ff",
            200: "#ccccff",
            300: "#b3b3ff",
            400: "#9999ff",
            500: "#8080ff",
            600: "#6666cc",
            700: "#4d4d99",
            800: "#333366",
            900: "#1a1a33"
        }
    } : {

        green: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#4cceac",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },

        primary: {
            100: "#040905",
            200: "#08120b",
            300: "#0c1b10",
            400: "#102416",
            500: "#142d1b",
            600: "#435749",
            700: "#728176",
            800: "#a1aba4",
            900: "#d0d5d1",
        },

        gray: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0",
        },

        red: {
            100: "#2d090b",
            200: "#591216",
            300: "#861c22",
            400: "#b2252d",
            500: "#df2e38",
            600: "#e55860",
            700: "#ec8288",
            800: "#f2abaf",
            900: "#f9d5d7",
        },
        indigo: {
            100: "#1a1a33",
            200: "#333366",
            300: "#4d4d99",
            400: "#6666cc",
            500: "#8080ff",
            600: "#9999ff",
            700: "#b3b3ff",
            800: "#ccccff",
            900: "#e6e6ff",
        }
    })
}







// mui theme settings
export const themeSettings = (mode: "dark" | "light") => {
    const colors = tokens(mode)
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.green[300]
                    },
                    neutral: {
                        dark: colors.gray[700],
                        main: colors.gray[500],
                        light: colors.gray[100]
                    },
                    background: {
                        default: "#1F1F1F",
                    }
                } : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.green[300]
                    },
                    neutral: {
                        dark: colors.gray[700],
                        main: colors.gray[500],
                        light: colors.gray[100]
                    },
                    background: {
                        default: colors.gray[900],
                    }
                })
        },
        typography: {

            fontFamily: ["Montserrat", "-apple-system", "Roboto", "'Helvetica Neue'", "sans-serif"].join(","),
            fontSize: 14,
            h1: {
                fontSize: 40,
            },
            h2: {
                fontSize: 32,
            },
            h3: {
                fontSize: 24,
            },
            h4: {
                fontSize: 20,
            },
            h5: {
                fontSize: 16,
            },
            h6: {
                fontSize: 14,
            },
        }
    }
}


// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { }
})

export function useMode(): [Theme, { toggleColorMode: () => void }] {
    const [themeMode, setThemeMode] = useLocalStorage("theme", "light")
    const [mode, setMode] = useState<ThemeMode>(themeMode || "light")

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const mode = prevMode === "light" ? "dark" : "light"
                    setThemeMode(mode)
                    return mode
                })
            }
        }),
        [] // eslint-disable-line react-hooks/exhaustive-deps
    )

    const theme = useMemo(() => {
        return createTheme(themeSettings(mode))
    }, [mode])
    return [theme, colorMode]

}
