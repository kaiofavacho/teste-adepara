import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './(app)/auth/signIn';
import Home from './(app)/home/home';
import { AuthProvider, useAuth } from '@/context/authProvider';
import { RootStackParamList } from '@/utils/navigation/navigationTypes';
import { RouteNames } from '@/utils/navigation/routeNames';
import { Text, View } from 'react-native';
import LoadingLogo from '@/components/common/loadingSpinner';
import { CustomDefaultTheme } from '@/styles/navigationTheme';
import Colors from '@/constants/colors';
import AnimalList from './(app)/animals/animalsList';
import UserEdit from './(app)/user/userEdit';
import { BluetoothProvider } from '@/context/bluetoothProvider';
import ArrivalConfirmation from '@/components/arrivalConfirmation';
import EarringApplication from '@/components/earningApplication';
import EarringReception from '@/components/earringReception';
import GTALinkEarrings from '@/components/GTALinkins';
import LogComponent from '@/components/loggerComponent';
import { LogProvider } from '@/context/logContext';
import BluetoothScreen from './(app)/bluetooth/bluetoothScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LogProvider>
      <AuthProvider>
        <BluetoothProvider>
          <NavigationContainer independent={true} theme={CustomDefaultTheme}>
            <MainNavigator />
          </NavigationContainer>
        </BluetoothProvider>
      </AuthProvider>
    </LogProvider>
  );
}
function MainNavigator() {
  const { isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingLogo />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <Stack.Screen
          name={RouteNames.SIGN_IN}
          component={SignIn}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name={RouteNames.HOME}
            component={Home}
            options={{
              headerShown: false,
              title: '',
              headerStyle: {
                backgroundColor: Colors.headerBackground,
              },
              headerTintColor: Colors.headerText,
            }}
          />
          <Stack.Screen
            name={RouteNames.BLUETOOTH}
            component={BluetoothScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.USER_EDIT}
            component={UserEdit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.ANIMAL_LIST}
            component={AnimalList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.ArrivalConfirmation}
            component={ArrivalConfirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.EarringApplication}
            component={EarringApplication}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name={RouteNames.EarringReception}
            component={EarringReception}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.GTALinkEarrings}
            component={GTALinkEarrings}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={RouteNames.LOGGER}
            component={LogComponent}
            options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}