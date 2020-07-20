import React, { useEffect } from 'react';
import { DrawerActions } from '@react-navigation/native';
import Api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    Dimensions,
    Image,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Importando estilos
import configStyleJSON from '../assets/styles/config/';
const { colorStyle } = configStyleJSON;

export default function SplashScreen({ navigation }) {

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async (evento) => {

            setTimeout(async () => {
                
                const token = await AsyncStorage.getItem('@usr_token');

                if (token !== null) {

                    const response = await Api.post('/usuario/mobile/verifyToken', {
                        token
                    });

                    if (response.data._mensagem || response.data._erros.length > 0) {
                        
                        navigation.dispatch(
                            DrawerActions.jumpTo('Login')
                        );

                    } else {

                        navigation.dispatch(
                            DrawerActions.jumpTo('Main')
                        );

                    }
                    
                } else {

                    navigation.dispatch(
                        DrawerActions.jumpTo('Login')
                    );

                }

            }, 2000);

        });
      
        return unsubscribe;

    }, [navigation]);

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/icons/welcome.png')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorStyle.secondary
    },
    logo: {
        width: width * 0.9,
        height: height * 0.3,
        borderColor: '#000',
        borderRadius: 10
    }

});