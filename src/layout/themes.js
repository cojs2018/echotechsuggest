import { DefaultTheme } from "react-native-paper";

export const lightTheme = {
    dark: false,
    roundness: 3,
    colors: {
        primary: '#1154d9',
        accent: '#1b5229',
        background: '#ffffff',
        surface: '#9aaeed',
        text: '#000000',
        disabled: '#3c3c3a',
        placeholder: '#575757',
        backdrop: '#07051c5f',
    },
    fonts: DefaultTheme.fonts,
    animation: DefaultTheme.animation,
};

export const darkTheme = {
    dark: true,
    mode: 'exact',
    roundness: 3,
    colors: {
        primary: '#082561',
        accent: '#106124',
        background: '#07051c',
        surface: '#660000',
        text: '#ffffff',
        disabled: '#3c3c3a',
        placeholder: '#575757',
        backdrop: '#00000034',
    },
    fonts: DefaultTheme.fonts,
    animation: DefaultTheme.animation,
};