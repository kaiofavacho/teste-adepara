import Colors from '@/constants/colors';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const CustomDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        background: Colors.background,
        card: Colors.surface,
        text: Colors.textPrimary,
        border: Colors.primaryLight,
        notification: Colors.secondary,
    },
};