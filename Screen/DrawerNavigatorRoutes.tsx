import React, { useEffect, useState } from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreen/HomeScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './DrawerScreen/ProfileScreen';
import userStore from '../store/userStore';
import { getMe } from '../Api/User';
import { Props } from '../types';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const homeScreenStack = ({navigation} : Props) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenStack = ({navigation} : Props) => {
  
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },  
      }}>
      <Stack.Screen
        name="ProfileScreen"
        // component={SettingsScreen}
        component={(props : any) => (
          <ProfileScreen {...props} />
        )}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = ({navigation} : any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const {setUser}  = userStore(state => state);
  useEffect(() => {
    // Check AsyncStorage for token
    const checkToken = async () => {
      try {
        let response = await getMe();
        setUser(response.data.user);
        setIsLogged(true);
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage: ', error);
        await AsyncStorage.removeItem('token');
        navigation.navigate('Auth');
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="ProfileScreenStack"
        options={{drawerLabel: 'Profile Screen'}}
        // component={ProfileScreenStack}
        component={ProfileScreenStack}
        />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
