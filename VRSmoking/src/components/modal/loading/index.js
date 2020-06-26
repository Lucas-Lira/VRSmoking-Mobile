import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// Importando estilos
import generalStyle from '../../../assets/styles/general/index';

import configStyleJSON from '../../../assets/styles/config/';
const { colorStyle, fontStyle, iconStyle, metricStyle } = configStyleJSON;

const info = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.content}>

                <Text style={generalStyle.modTextTitlePrimary}>{props.title}</Text> 

                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <ActivityIndicator 
                        size="large"
                        color="#009640"
                        animating={true} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: colorStyle.secondary,
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colorStyle.primary,
    }
});

export default info;