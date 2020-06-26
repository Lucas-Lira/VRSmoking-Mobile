import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ContentTopTabNavigator = createMaterialTopTabNavigator();

import Conversas from "../../pages/chat/conversas";
import Status from "../../pages/chat/status";
import Ajuda from "../../pages/chat/ajuda"

 const Chat = ({ route, navigation }) => {
    return (
      <ContentTopTabNavigator.Navigator>
        <ContentTopTabNavigator.Screen 
            name="Conversas"
            component={Conversas}
            // initialParams={{ atividade: route.params.atividade }} 
        />
        <ContentTopTabNavigator.Screen 
            name="Status" 
            component={Status}
            // initialParams={{ atividade: route.params.atividade }} 
        />
        <ContentTopTabNavigator.Screen 
            name="Ajuda"
            component={Ajuda} 
            // initialParams={{ atividade: route.params.atividade }}
        />
      </ContentTopTabNavigator.Navigator>
    );
}

export default Chat;