import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import VideoPlayer from 'react-native-video-controls';
import Pdf from 'react-native-pdf';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../services/api';

import configStyleJSON from '../../assets/styles/config';
const { colorStyle } = configStyleJSON;

const { width, height } = Dimensions.get('window');

 const Viewer = ({ route, navigation }) => {

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
        <View style={{ flex: 1, backgroundColor: colorStyle.secondary }}>
            {
                route.params.extension === '.pdf' ? 
                    <Pdf
                        style={styles.pdf}
                        source={{ uri: route.params.uri, cache: true }}
                    />
                :
                    route.params.extension === '.html' ?
                        <WebView 
                            style={{ flex: 1 }}
                            source={{ uri: route.params.uri }}
                            ignoreSslError={true}
                            scalesPageToFit={true}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                            onError={(err) => console.log('Error WebView: ', err)} />
                    :
                        <VideoPlayer 
                            source={{ uri: route.params.uri }}
                            resizeMode="cover"
                            disableVolume
                            disableBack
                            isLooping
                            repeat
                            style={{ flex: 1 }}
                        />
            }
        </View>
    );
}

export default Viewer;

const styles = StyleSheet.create({
    pdf: {
        width: width,
        height: height,
    }
});
