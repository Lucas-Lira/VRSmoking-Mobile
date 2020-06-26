import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Importando Estilos
import configStyleJSON from '../config/';
const { colorStyle, fontStyle } = configStyleJSON;

const general =  StyleSheet.create({
    // TEXT
    textTitle: {
        color: colorStyle.primary,
        fontSize: fontStyle.largeSize,
        fontWeight: 'bold',
        fontFamily: fontStyle.primary
    },
    textDefault: {
        color: colorStyle.default,//'#708DB0',
        textAlign: "center",
        fontSize: fontStyle.mediumSize,
        width: width * 0.9,
        fontFamily: fontStyle.secondary,
    },
    textValidation: {
        fontSize: 10,
        marginLeft: 20,
        color: colorStyle.danger
    },
    textLinkPrimary: {
        fontSize: fontStyle.regularSize,
        color: colorStyle.primary,
        fontFamily: fontStyle.primary
    },
    textLinkSecondary: {
        fontSize: fontStyle.smallSize,
        fontFamily: fontStyle.primary,
        color: colorStyle.default
    },
    textLinkSecondaryBold: {
        fontSize: fontStyle.smallSize,
        fontFamily: fontStyle.primary,
        color: colorStyle.default,
        fontWeight: 'bold'
    },
    // TEXTINPUT
    textInputPrimary: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: colorStyle.secondary,
        fontSize: fontStyle.regularSize,
        marginLeft: 20,
        color: '#fff',//colorStyle.default,
        width: width * 0.8,
    },
    textInputDanger: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: colorStyle.secondary,
        fontSize: fontStyle.regularSize,
        borderBottomWidth: 1,
        borderBottomColor: colorStyle.danger,
        marginLeft: 20,
        color: colorStyle.default,
        width: width * 0.8
    },
    // TOUCHABLEOPACITY
    btnPrimary: {
        backgroundColor: colorStyle.primary,
        width: width * 0.5,
        height: 37,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
    },
    btnPrimaryText: {
        color: colorStyle.secondary,
        fontWeight: "bold",
        fontSize: fontStyle.mediumSize,
        fontFamily: 'serif'
    },
    btnDefault: {
        backgroundColor: colorStyle.default,
        width: width * 0.5,
        height: 37,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
    },
    btnDefaultText: {
        color: colorStyle.secondary,
        fontWeight: "bold",
        fontSize: fontStyle.mediumSize,
        fontFamily: 'serif'
    },
    btnDanger: {
        backgroundColor: colorStyle.danger,
        width: width * 0.5,
        height: 37,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
    },
    btnDangerText: {
        color: colorStyle.secondary,
        fontWeight: "bold",
        fontSize: fontStyle.mediumSize,
        fontFamily: 'serif'
    },
    // secondary: {
    //     backgroundColor: '#fff' // white
    // },
    // success: {
    //     backgroundColor: '#2E7D32' // Green
    // },
    // warning: {
    //     backgroundColor: '#F9A825' // Yellow
    // },
    // default: {
    //     backgroundColor: '#607D8B'//'#455A64' // Gray
    // },
    // danger: {
    //     backgroundColor: '#B71C1C' // Red
    // }

    // VIEW
    viewInputText: {
        width: width,
        marginTop: 5,
        flexDirection: "row"
    },
    // SCROLLVIEW
    scrollViewContainer: {
        backgroundColor: colorStyle.secondary,
        width: width,
        height: height
    }, 
    // MODAL
    modTextTitlePrimary: {
        color: colorStyle.primary,
        fontSize: fontStyle.largeSize,
        fontWeight: 'bold',
        fontFamily: fontStyle.primary
    },
    modTextTitleDanger: {
        color: colorStyle.danger,
        fontSize: fontStyle.largeSize,
        fontWeight: 'bold',
        fontFamily: fontStyle.primary
    },

});

export default general;