import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Index from './pages/';
import Login from './pages/login/'
import InstrucoesParaCadastro from './pages/instrucoesParaCadastro/';
import Content from './pages/content';
import Mensagens from './pages/chat/mensagem';

import { DrawerContent } from './components/drawerContent/';
import MainTabScreen from './components/mainTabScreen/';

const Drawer = createDrawerNavigator();

function Routes() {
  
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Main" component={MainTabScreen} />
        <Drawer.Screen name="Index" component={Index} />
        <Drawer.Screen name="InstrucoesParaCadastro" component={InstrucoesParaCadastro} />
        <Drawer.Screen name="Content" component={Content} />
        <Drawer.Screen name="Mensagens" component={Mensagens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  
};

export default Routes;