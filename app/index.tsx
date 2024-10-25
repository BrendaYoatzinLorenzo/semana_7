import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionProvider } from '@/components/features/auth/provider';
import LoginScreen from '@/components/features/auth/application/screens/loginView';
import { HomeView } from '@/components/features/auth/application/screens/homeView';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
       <SessionProvider >
         {/* Aca va el componente que provee la sesion */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeView} />
      </Stack.Navigator>
         {/*... */}
       </SessionProvider>
    </NavigationContainer>
  );
}