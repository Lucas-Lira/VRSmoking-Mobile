import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Mensagem from './mensagem';

// Importando estilos
import configStyleJSON from '../../assets/styles/config';
const { colorStyle, iconStyle } = configStyleJSON;

const MensagemStack = createStackNavigator();

const MensagemStackScreen = ({ route, navigation }) => {
  return (
      <MensagemStack.Navigator screenOptions={{
          headerStyle: {
              backgroundColor: colorStyle.secondary,
          },
          headerTintColor: colorStyle.primary,
          headerTitleStyle: {
              fontWeight: 'bold'
          }
      }}>

          <MensagemStack.Screen 
            name="Mensagens" 
            component={Mensagem}
            options={{
              title: route.params.page_title,
              headerLeft: () => (
                  <Icon.Button name="arrow-back" size={25} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.goBack() }></Icon.Button>
              ),
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <Icon.Button name="videocam" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                  <Icon.Button name="call" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                  <Icon.Button name="more-vert" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                </View>
              )
            }} />

      </MensagemStack.Navigator>
  );
}

export default MensagemStackScreen;