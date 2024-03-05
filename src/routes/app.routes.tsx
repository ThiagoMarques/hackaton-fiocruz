import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from '../pages/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Home } from '../pages/Home';
import { Training } from '../pages/Training';
import { TrainingDetail } from '../pages/TrainingDetail';
import { Instructions } from '../pages/Instructions';
import { TrainingPlay } from '../pages/TrainingPlay';
import { Progress } from '../pages/Progress';
import { Letter } from '../pages/Letter';
import { SignIn } from '../pages/SignIn';

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
        name="Training"
        options={{
          tabBarLabel: 'Treinos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
        component={Training}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Perfis',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        component={Progress}
      />
    </Tab.Navigator>
  );
}

export const AppRoutes: React.FunctionComponent = () => {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Tabs" component={MyTabs} />
      <App.Screen name="Training" component={Training} />
      <App.Screen name="Register" component={Register} />
      <App.Screen name="TrainingDetail" component={TrainingDetail} />
      <App.Screen name="Instructions" component={Instructions} />
      <App.Screen name="TrainingPlay" component={TrainingPlay} />
      <App.Screen name="Letter" component={Letter} />
      <App.Screen name="SignIn" component={SignIn} />
    </App.Navigator>
  );
};
