import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from '../pages/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Home } from '../pages/Home';
import { Config } from '../pages/Config';

const App = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Config"
        options={{
          tabBarLabel: 'Config',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        component={Config}
      />
    </Tab.Navigator>
  );
}

export const AppRoutes: React.FunctionComponent = () => {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Tabs" component={MyTabs} />
      <App.Screen name="Register" component={Register} />
    </App.Navigator>
  );
};
