import React, { useEffect } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    View,
    Text
} from 'react-native';

export default function notificacoes({ navigation, route }) {

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', e => {

      let checkLoggedUser = async () => {

        const token = await AsyncStorage.getItem('@usr_token');

        if(token) {

            const response = await Api.post('/usuario/mobile/verifyToken', {
                token
            });

            if (response.data._mensagem || response.data._erros.length > 0) 
                navigation.navigate('Login');
            
        } else
            navigation.navigate('Login');

      };

      checkLoggedUser();

    });

    return unsubscribe;

  }, [route]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notificações</Text>
    </View>
  );
}
