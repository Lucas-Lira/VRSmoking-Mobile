import React, { useEffect } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    View,
    Text
} from 'react-native';

export default function explore({ navigation }) {

  useEffect(() => {

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

  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Explorar</Text>
    </View>
  );
}
