import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const ContentTopTabNavigator = createMaterialTopTabNavigator();

import ListContent from "../../pages/content/listContent";

 const ContentsTab = ({ route, navigation }) => {
    return (
      <ContentTopTabNavigator.Navigator>
        <ContentTopTabNavigator.Screen 
            name="Todos"
            component={ListContent}
            initialParams={{ atividade: route.params.atividade }} />
        <ContentTopTabNavigator.Screen 
            name="PDF" 
            component={ListContent}
            initialParams={{ atividade: route.params.atividade }} />
        <ContentTopTabNavigator.Screen 
            name="Vídeo"
            component={ListContent} 
            initialParams={{ atividade: route.params.atividade }} />
        <ContentTopTabNavigator.Screen 
            name="VR"
            component={ListContent} 
            initialParams={{ atividade: route.params.atividade }} />
      </ContentTopTabNavigator.Navigator>
    );
}

export default ContentsTab;