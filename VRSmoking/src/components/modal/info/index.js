import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importando estilos
import generalStyle from '../../../assets/styles/general/index';

import configStyleJSON from '../../../assets/styles/config/';
const { colorStyle, fontStyle, iconStyle, metricStyle } = configStyleJSON;

const info = (props) => {
    return (
        <Modal isVisible={props.visible}>
            <View style={styles.content}>
                <Text style={generalStyle.modTextTitlePrimary}>{props.title}</Text> 
                <Icon
                    name='error'
                    color={colorStyle.primary}
                    size={iconStyle.iconModal.size}
                />
                <View style={metricStyle.mb20}>
                    <Text style={styles.mesageModal}>{props.mesage}</Text>
                </View>
                <TouchableOpacity style={generalStyle.btnPrimary}
                    onPress={props.functionBtnOK}>
                    <Text style={generalStyle.btnPrimaryText}>OK</Text>
                </TouchableOpacity>
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
    },
    mesageModal: {
        fontSize: fontStyle.mediumSize,
        color: colorStyle.default
    },
});

export default info;