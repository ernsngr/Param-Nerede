import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Screens
import { AddPage } from './app/screens/AddPage/AddPage';
import { HomePage } from './app/screens/HomePage/HomePage';
import { StatsPage } from './app/screens/StatsPage/StatsPage';
// Icons
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
// db
import { initDB } from './app/db/db';

const Tab = createBottomTabNavigator();

export default function App() {
  
   const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const prepareDB = async () => {
      try {
        await initDB();
        setDbReady(true); // DB hazır
      } catch (err) {
        console.log('DB init hatası:', err);
      }
    };
    prepareDB();
  }, []);

  if (!dbReady) {
    return null; // veya <Loading /> ekranı
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle:{
          height: 100,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#0D5EA6"
      }}>
        <Tab.Screen name="HomePage" component={HomePage}
          options={{
            tabBarIcon: ({focused}) => <FontAwesome5 name="home" size={24} color={focused ? "#0D5EA6" : "grey"} />,
            
            title: "Home",
            headerShown: false
          }}
        />
        <Tab.Screen name="AddPage" component={AddPage} options={{
          tabBarIcon: ({focused}) => <AntDesign name="plussquare" size={24} color={focused ? "#0D5EA6" : "grey"} />,
          title: "Add",
          headerShown: false
        }}/>
        <Tab.Screen name="StatsPage" component={StatsPage} options={{
          tabBarIcon: ({focused}) => <Ionicons name="stats-chart" size={24} color={focused ? "#0D5EA6" : "grey"} />,
          title: "Stats",
          headerShown: false
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}