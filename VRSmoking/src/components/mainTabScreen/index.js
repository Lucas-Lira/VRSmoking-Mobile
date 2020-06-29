import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons'; //Ionicons
//import Lottie from 'lottie-react-native';

// Importando animações
import houseAnimation from '../../assets/animations/house.json';

import Home from '../../pages/home/';
import Notifications from '../../pages/notificacoes/';
import Profile from '../../pages/perfil/';
import Explore from '../../pages/explore/';
import Chat from '../topTabNavigator/chat';
import School from '../../pages/school';

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
// const ExploreStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SchoolStack = createStackNavigator();

//const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

// Importando estilos
import generalStyle from '../../assets/styles/general/';
import configStyleJSON from '../../assets/styles/config/';
const { colorStyle, iconStyle, metricStyle } = configStyleJSON;

// Esse é o rodapé de baixo
const MainTabScreen = () => {
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colorStyle.primary}
      headerTintColor={colorStyle.primary}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Principal',
          tabBarColor: colorStyle.secondary,
          tabBarIcon: (/*{ color }*/) => (
            <Icon name="home" color={colorStyle.primary} size={iconStyle.size} />
          ),
        }}
      />

    <Tab.Screen
      name="School"
      component={SchoolStackScreen}
      options={{
        tabBarLabel: 'Escola',
        tabBarColor: colorStyle.secondary,
        tabBarIcon: (/*{ color }*/) => (
          <Icon name="local-library" color={colorStyle.primary} size={iconStyle.size} />
        ),
      }}
    />

      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Notificações',
          tabBarColor: colorStyle.secondary,
          tabBarIcon: (/*{ color }*/) => (
            <Icon name="notifications" color={colorStyle.primary} size={iconStyle.size} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarColor: colorStyle.secondary,
          tabBarIcon: (/*{ color }*/) => (
            <Icon name="chat" color={colorStyle.primary} size={iconStyle.size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarColor: colorStyle.secondary,
          tabBarIcon: (/*{ color }*/) => (
            <Icon name="account-circle" color={colorStyle.primary} size={iconStyle.size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: colorStyle.secondary,
    },
    headerTintColor: colorStyle.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={Home} options={{
      title: 'Principal',
      headerLeft: () => (
        <Icon.Button name="reorder" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
        // <>
          <Icon.Button name="search" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
          // {/* <Icon.Button name="more-vert" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} /> */}
        // </>
      )
    }} />
  </HomeStack.Navigator>
);

const NotificationsStackScreen = ({ navigation }) => (
  <NotificationsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: colorStyle.secondary,
    },
    headerTintColor: colorStyle.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <NotificationsStack.Screen name="Notifications" component={Notifications} options={{
      title: 'Notificações',
      headerLeft: () => (
        <Icon.Button name="reorder" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
          <Icon.Button name="search" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
      )
    }} />
  </NotificationsStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: colorStyle.secondary,
    },
    headerTintColor: colorStyle.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <ProfileStack.Screen name="Profile" component={Profile} options={{
      title: 'Perfil',
      headerLeft: () => (
        <Icon.Button name="reorder" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
          <Icon.Button name="search" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
      )
    }}/>
  </ProfileStack.Navigator>
);

const ChatStackScreen = ({ navigation }) => {

  return (
    <ChatStack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: colorStyle.secondary,
        },
        headerTintColor: colorStyle.primary,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >

        <ChatStack.Screen 
          name="Chat"
          component={Chat}
          options={{
            title: 'Chat',
            headerLeft: () => (

              <Icon.Button 
                name="reorder" 
                size={iconStyle.size} 
                color={colorStyle.primary}
                backgroundColor={colorStyle.secondary} 
                onPress={() => navigation.openDrawer()}
              ></Icon.Button>

            ),
            headerRight: () => (

              <Icon.Button 
                name="search" 
                size={iconStyle.size} 
                color={colorStyle.primary} 
                backgroundColor={colorStyle.secondary} 
                onPress={() => {  }} 
              />

            )
          }}
        />

    </ChatStack.Navigator>
  )

};

const SchoolStackScreen = ({ navigation }) => (
  <SchoolStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: colorStyle.secondary,
    },
    headerTintColor: colorStyle.primary,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <SchoolStack.Screen name="SchoolStack" component={School} options={{
      title: 'Escola',
      headerLeft: () => (
        <Icon.Button name="reorder" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
      ),
      headerRight: () => (
          <Icon.Button name="search" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
      )
    }}/>
  </SchoolStack.Navigator>
);
