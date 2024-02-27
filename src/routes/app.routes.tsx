import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from '../pages/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Home } from '../pages/Home';
import { Config } from '../pages/Config';
import { Treinos } from '../pages/Treinos';
import { TreinoDetalhado } from '../pages/TreinoDetalhado';
import { Instrucoes } from '../pages/Instrucoes';
import { TreinoPLay } from '../pages/TreinoPlay';

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
        name="Treinos"
        options={{
          tabBarLabel: 'Treinos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
        component={Treinos}
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
      <App.Screen name="Treinos" component={Treinos} />
      <App.Screen name="Register" component={Register} />
      <App.Screen name="TreinoDetalhado" component={TreinoDetalhado} />
      <App.Screen name="Instrucoes" component={Instrucoes} />
      <App.Screen name="TreinoPlay" component={TreinoPLay} />
    </App.Navigator>
  );
};
