import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ContentsTab from '../../components/topTabNavigator/content';
import Viewer from '../viewer/';

// Importando estilos
import configStyleJSON from '../../assets/styles/config';
const { colorStyle, iconStyle } = configStyleJSON;

// Stack Navigator
const ContentsStack = createStackNavigator();

const ContentsStackScreen = ({ navigation, route }) => {
    return (
        <ContentsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colorStyle.secondary,
            },
            headerTintColor: colorStyle.primary,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <ContentsStack.Screen name="ContentsTab" component={ContentsTab} options={{
                title: route.params.fase_descricao + ` / ` + route.params.atividade_titulo,
                headerLeft: () => (
                    <Icon.Button name="reorder" size={25} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                headerRight: () => (
                    // <>
                    <Icon.Button name="search" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                    // <Icon.Button name="more-vert" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                    // </>
                )
            }} />

            {/* Testando nova rota no navegador de pilha */}
            <ContentsStack.Screen name="Viewer" component={Viewer} options={{
                title: 'Visualizador'
            }} />

        </ContentsStack.Navigator>
    );
}

export default ContentsStackScreen;
