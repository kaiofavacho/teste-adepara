import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LogsScreen from './tabs/logsScreen';
import DevicesScreen from './tabs/devicesScreen';
import ScanScreen from './tabs/scanScreen';

const Tab = createBottomTabNavigator();

const BluetoothScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // tabBarIcon: ({ focused, color, size }) => {
                //     let iconName: keyof typeof Ionicons.glyphMap = 'ios-list'; // Default icon

                //     if (route.name === 'Logs') {
                //         iconName = focused ? 'ios-list' : 'ios-list-outline';
                //     } else if (route.name === 'Devices') {
                //         iconName = focused ? 'ios-bluetooth' : 'ios-bluetooth-outline';
                //     } else if (route.name === 'Scan') {
                //         iconName = focused ? 'ios-search' : 'ios-search-outline';
                //     }

                //     return <Ionicons name={iconName} size={size} color={color} />;
                // },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Logs" component={LogsScreen} />
            <Tab.Screen name="Devices" component={DevicesScreen} />
            <Tab.Screen name="Scan" component={ScanScreen} />
        </Tab.Navigator>
    );
};

export default BluetoothScreen;
