import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './pages/';
import Login from './pages/login/'
import InstrucoesParaCadastro from './pages/instrucoesParaCadastro/';
import Content from './pages/content';
import MessageStack from './pages/chat/stackNavigatorMensagem';

import ManualStack from './pages/manualSistema/';

import { DrawerContent } from './components/drawerContent/';
import MainTabScreen from './components/mainTabScreen/';

const Drawer = createDrawerNavigator();

function Routes() {
  
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="SplashScreen" component={SplashScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Main" component={MainTabScreen} />
        <Drawer.Screen name="InstrucoesParaCadastro" component={InstrucoesParaCadastro} />
        <Drawer.Screen name="Content" component={Content} />
        <Drawer.Screen name="Mensagens" component={MessageStack} />
        <Drawer.Screen name="Manual" component={ManualStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  
};

export default Routes;