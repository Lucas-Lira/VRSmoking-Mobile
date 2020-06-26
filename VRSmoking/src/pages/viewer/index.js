import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import VideoPlayer from 'react-native-video-controls';
import Pdf from 'react-native-pdf';

const { width, height } = Dimensions.get('window');

 const Viewer = ({ route, navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
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
        //flex: 1,
        width: width,
        height: height,
    }
});
