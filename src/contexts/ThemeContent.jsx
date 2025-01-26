import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
    const [themePreference, setThemePreference] = useState(() => {
        const storedTheme = localStorage.getItem('themePreference');
        if (storedTheme) {
            return storedTheme;
        }
        return 'device';
    });

    const [appliedTheme, setAppliedTheme] = useState(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkScheme ? 'dark' : 'light';
    });

    useEffect(() => {
        const handleChange = (e) => {
            if (themePreference === 'device') {
                setAppliedTheme(e.matches ? 'dark' : 'light');
            }
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [themePreference]);

    useEffect(() => {
        if (themePreference === 'device') {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setAppliedTheme(prefersDarkScheme ? 'dark' : 'light');
        } else {
            setAppliedTheme(themePreference);
        }
    }, [themePreference]);

    function toggleTheme() {
        const newTheme = appliedTheme === 'light' ? 'dark' : 'light';
        setThemePreference(newTheme);
        localStorage.setItem('themePreference', newTheme);
    }

    function setSpecificTheme(newTheme) {
        setThemePreference(newTheme);
        localStorage.setItem('themePreference', newTheme);
    }

    const value = { 
        themePreference,
        appliedTheme,
        setSpecificTheme,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}