import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the types for our context
interface ColorContextType {
    navbarBg: string;
    bodyBg: string;
    toggleColors: () => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

// Provider component to manage color states and provide toggle function
const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [navbarBg, setNavbarBg] = useState('bg-gray-800');
    const [bodyBg, setBodyBg] = useState('bg-gradient-to-r from-blue-100 to-blue-300');

    // Load the colors from localStorage on component mount
    useEffect(() => {
        const storedNavbarBg = localStorage.getItem('navbarBg');
        const storedBodyBg = localStorage.getItem('bodyBg');

        if (storedNavbarBg && storedBodyBg) {
            setNavbarBg(storedNavbarBg);
            setBodyBg(storedBodyBg);
        }
    }, []);

    const toggleColors = () => {
        const newNavbarBg = bodyBg; // Swap colors
        const newBodyBg = navbarBg;

        setNavbarBg(newNavbarBg);
        setBodyBg(newBodyBg);

        // Save to localStorage to persist the state
        localStorage.setItem('navbarBg', newNavbarBg);
        localStorage.setItem('bodyBg', newBodyBg);
    };

    return (
        <ColorContext.Provider value={{ navbarBg, bodyBg, toggleColors }}>
            {children}
        </ColorContext.Provider>
    );
};

const useColorContext = (): ColorContextType => {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error('useColorContext must be used within a ColorProvider');
    }
    return context;
};

export { ColorProvider, useColorContext };
