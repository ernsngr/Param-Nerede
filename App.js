import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import { AddPage } from './app/screens/AddPage/AddPage';
import { HomePage } from './app/screens/HomePage/HomePage';
import { StatsPage } from './app/screens/StatsPage/StatsPage';
// Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle:{
          height: 100,
          paddingTop: 10
        },
        
      }}>
        <Tab.Screen name="HomePage" component={HomePage}
          options={{
            tabBarIcon: () => <FontAwesome5 name="home" size={24} color="#0D5EA6" />,
            title: "Home",
            headerShown: false
          }}
        />
        <Tab.Screen name="AddPage" component={AddPage} options={{
          tabBarIcon: () => <AntDesign name="plussquare" size={24} color="#0D5EA6" />,
          title: "Add"
        }}/>
        <Tab.Screen name="StatsPage" component={StatsPage} options={{
          tabBarIcon: () => <Ionicons name="stats-chart" size={24} color="#0D5EA6" />,
          title: "Stats"
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}