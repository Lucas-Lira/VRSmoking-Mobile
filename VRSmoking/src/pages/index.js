import React, { useState, useEffect } from 'react';
//import Api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    FlatList
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';

const NewsStack = createStackNavigator();

const { width, height } = Dimensions.get('window');

// Importando estilos
import generalStyle from '../assets/styles/general/';
import configStyleJSON from '../assets/styles/config/';
const { colorStyle, iconStyle, metricStyle } = configStyleJSON;

import { 
    Card,
    CardTitle,
    CardContent,
    CardAction,
    CardButton,
    CardImage
} from 'react-native-cards';

function renderItem({ item }) {
    return (
        <Card>
            <Text style={[generalStyle.textTitle, { padding: 7 }]}>Título Da Notícia</Text>
            <CardImage
                source={{ uri: 'http://bit.ly/2GfzooV' }}
                title="Observação ou descrição simples da imagem"
            />
            <CardTitle
                subtitle="Data da Notícia: 02/03/2020"
                
            />
            <CardContent style={styles.fontText} text="Resumo da Notícia - It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. " />
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => Alert.alert('More Information...')}
                    title="Saiba Mais"
                    color={colorStyle.primary}
                />
                <CardButton
                    onPress={() => Alert.alert('To Share')}
                    title="Compartilhar"
                    color={colorStyle.primary}
                />
                {/* <View style={[styles.viewCardAction, metricStyle.flexRow]}>
                    <Icon
                        name={'visibility'}
                        color={colorStyle.primary}
                        size={iconStyle.cardIcon.size}
                    />
                    <Icon
                        name={'visibility'}
                        color={colorStyle.primary}
                        size={iconStyle.cardIcon.size}
                    />
                </View> */}
            </CardAction>
        </Card>
    );
}

function News({ navigation }) {

    const DATA = [
        {
          id: '1',
          title: 'First Item',
        },
        {
          id: '2',
          title: 'Second Item',
        },
        {
          id: '3',
          title: 'Third Item',
        },
        {
            id: '4',
            title: 'First Item',
          },
          {
            id: '5',
            title: 'Second Item',
          },
          {
            id: '6',
            title: 'Third Item',
          },
          {
            id: '7',
            title: 'Second Item',
          },
          {
            id: '8',
            title: 'Third Item',
          },
          {
              id: '9',
              title: 'First Item',
            },
            {
              id: '10',
              title: 'Second Item',
            },
            {
              id: '11',
              title: 'Third Item',
            },
    ];

    return (

        <>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                //onRefresh={onRefresh}
                //refreshing={pRefreshing}
                //extraData={selected}
            />
        </>

    );
}

export default NewsStackScreen = ({ navigation }) => (
    <NewsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: colorStyle.secondary
        },
        headerTintColor: colorStyle.primary,
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <NewsStack.Screen name="News" component={News} options={{
            title: 'Principal',
            headerLeft: () => (
                <Icon.Button name="reorder" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            headerRight: () => (
                <Icon.Button name="search" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
            )
        }} />
    </NewsStack.Navigator>
);

const styles = StyleSheet.create({
    
    viewCardAction: {
        width: width * 0.3,
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    }

});