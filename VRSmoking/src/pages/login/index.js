import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Text,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';

import { CommonActions, StackActions, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';

const LoginStack = createStackNavigator();

const { width, height } = Dimensions.get('window');

import serviceConfig from '../../services/config';
const { URL } = serviceConfig;

// Importando estilos
import generalStyle from '../../assets/styles/general';
import configStyleJSON from '../../assets/styles/config';
const { colorStyle, iconStyle, metricStyle } = configStyleJSON;

// Importando Modal
import ModalInfo from '../../components/modal/info/index';
import ModalDanger from '../../components/modal/danger/index';

function login({ navigation }) {

    const [email, setEmail] = useState(``);
    const [senha, setSenha] = useState(``);
    const [validationEmail, setValidationEmail] = useState(``);
    const [validationSenha, setValidationSenha] = useState(``);
    const [secondTextInput, setSecondTextInput] = useState(``);

    const [viewPassword, setViewPassword] = useState(``);

    const [visibleModal, setVisibleModal] = useState(``);
    const [msgModal, setMsgModal] = useState(``);

    useEffect(async () => {

        const usr_id = await AsyncStorage.getItem('@usr_id');

        if (usr_id !== null) { // Usuário já está logado

            // Validar se o teken do usuário está válido

            navigation.navigate('Main');

        }

    }, []);

    isEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");
            return false;
        } else {
            console.log("Email is Correct");
            return true;
        }
    }

    handleLogar = async () => {

        try {

            let validEmail = false;
            let validSenha = false;

            setValidationEmail(``);
            setValidationSenha(``);

            if (email) {
                if (isEmail(email)) {
                    validEmail = true;
                    setValidationEmail(``);
                } else
                    setValidationEmail(`E-Mail Inválido`);
            } else
                setValidationEmail(`Informe o E-Mail`);

            if (senha) {
                if (senha.length > 7) {
                    validSenha = true;
                    setValidationSenha(``);
                } else
                    setValidationSenha(`A senha deve tem no mínimo 8 (oito) caracteres`);
            } else
                setValidationSenha(`Informe a Senha`);

            if (validEmail && validSenha) {

                const response = await api.post('/usuario/mobile/autenticar', {
                    email: email,
                    password: senha
                });

                // response.data - É onde está armazenado os dados de retorno.
                // response.headers - Permite acessar o cabeçalho.
                // response.ok - Retorna true ou false de acordo com o satus da requisição (400 por exemplo), caso seja um status positivo de requisição concluída é retornado true

                if (response.data._mensagem) {

                    setMsgModal(response.data._mensagem);
                    setVisibleModal('danger');

                } else if (response.data._erros.length > 0) {

                    let auxValidationEmail = ``;
                    let auxValidationSenha = ``;

                    response.data._erros.forEach((element) => {

                        if (element.param === 'email')
                            auxValidationEmail = element.msg;
                        else if (element.param === 'password')
                            auxValidationSenha = element.msg;

                    });

                    !auxValidationEmail ? setValidationEmail(``) : setValidationEmail(auxValidationEmail);
                    !auxValidationSenha ? setValidationSenha(``) : setValidationSenha(auxValidationSenha);

                } else {

                    const { usr_id, usr_nome, usr_token, usr_nivel, grp_id, calend_id } = response.data._result[0];

                    await AsyncStorage.setItem('@usr_id', String(usr_id));
                    await AsyncStorage.setItem('@usr_nome', usr_nome);
                    await AsyncStorage.setItem('@usr_token', usr_token);
                    await AsyncStorage.setItem('@usr_nivel', String(usr_nivel));
                    await AsyncStorage.setItem('@grp_id', String(grp_id));
                    await AsyncStorage.setItem('@calend_id', String(calend_id));

                    navigation.navigate('Main');

                    // navigation.dispatch(
                    //     DrawerActions.replace('Main', {
                    //         screen: 'Home',
                    //     })
                    // );

                    //navigation.jumpTo('Main');

                    // navigation.dispatch(
                    //     navigation.replace('Main')
                    // );

                    // navigation.dispatch(
                    //     CommonActions.navigate({
                    //         name: 'Main',
                    //         //params: {},
                    //     })
                    // );

                }

            }

        } catch (response) {
            setVisibleModal('danger');
            setMsgModal('Falha na Autenticação');
        }

    }

    handleViewPassword = () => {
        viewPassword ? setViewPassword(``) : setViewPassword(`view`);
    }

    return (
        <>
            <ScrollView style={generalStyle.scrollViewContainer}>

                <View style={styles.view1}>
                    <Text style={generalStyle.textTitle}>Bem Vindo</Text>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/doctor.png')}
                    />
                </View>

                <View style={styles.view2}>

                    <View style={generalStyle.viewInputText}>

                        <TextInput
                            //style={validationEmail === '' ? generalStyle.textInputPrimary : generalStyle.textInputDanger}
                            style={generalStyle.textInputPrimary}
                            error={validationEmail !== ''}
                            //defaultValue={colorStyle.primary}
                            //defaultValue={'red'}
                            inlineImageLeft='email'
                            inlineImagePadding={iconStyle.inlineImagePadding}
                            placeholder="E-Mail"
                            value={email}
                            //selectionColor={colorStyle.primary}
                            keyboardType={'email-address'}
                            onChangeText={setEmail}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { secondTextInput.focus(); }}
                            blurOnSubmit={false}

                            underlineColor={colorStyle.default}
                        //selectionColor={colorStyle.default}
                        //underlineColorAndroid={colorStyle.default}
                        //placeholderTextColor={colorStyle.primary}
                        />

                        <Icon
                            style={validationEmail === `` ? styles.textInputIcon : styles.textInputIconError}
                            name='check' // close
                            color={validationEmail === `` ? colorStyle.default : colorStyle.danger}
                            size={iconStyle.size}
                        />

                    </View>

                    <Text style={generalStyle.textValidation}>{validationEmail}</Text>

                    <View style={generalStyle.viewInputText}>

                        <TextInput
                            // style={validationSenha === '' ? generalStyle.textInputPrimary : generalStyle.textInputDanger}
                            style={generalStyle.textInputPrimary}
                            error={validationSenha !== ''}
                            inlineImageLeft='lock'
                            inlineImagePadding={iconStyle.inlineImagePadding}
                            secureTextEntry={viewPassword === `` ? true : false}
                            placeholder="Senha"
                            underlineColor={colorStyle.default}
                            value={senha}
                            autoCorrect={false}
                            onSubmitEditing={() => handleLogar()}
                            onChangeText={setSenha}
                            ref={(input) => { setSecondTextInput(input); }}
                        />

                        <Icon
                            style={validationSenha === `` ? styles.textInputIcon : styles.textInputIconError}
                            name={viewPassword === `` ? 'visibility-off' : 'visibility'}
                            onPress={() => handleViewPassword()}
                            color={validationSenha === `` ? colorStyle.default : colorStyle.danger}
                            size={iconStyle.size}
                        />

                    </View>

                    <Text style={generalStyle.textValidation}>{validationSenha}</Text>

                </View>

                <View style={styles.view3}>

                    <View style={styles.viewIForgotMyPassword}>
                        <Text
                            style={generalStyle.textLinkPrimary}
                            onPress={() => Alert.alert('Direcionar...')}
                        >Esqueceu a Senha</Text>
                    </View>

                    <TouchableOpacity
                        style={generalStyle.btnPrimary}
                        onPress={() => handleLogar()}
                    >
                        <Text style={generalStyle.btnPrimaryText}>Login</Text>
                    </TouchableOpacity>

                    <Text
                        style={generalStyle.textLinkPrimary}
                    >Ou Via Mídia Social</Text>

                    <View style={metricStyle.flexRow}>
                        <SocialIcon
                            style={styles.socialIcon}
                            iconSize={iconStyle.socialIcon.size}
                            type='facebook'
                        />

                        <SocialIcon
                            style={styles.socialIcon}
                            iconSize={iconStyle.socialIcon.size}
                            type='youtube'
                        />
                    </View>

                    <View style={[metricStyle.flexRow, metricStyle.mb10]}>
                        <Text
                            style={generalStyle.textLinkSecondary}
                            onPress={() => navigation.navigate('InstrucoesParaCadastro')}
                        >Não Tem uma Conta?</Text>
                        <Text
                            style={generalStyle.textLinkSecondaryBold}
                            onPress={() => navigation.navigate('InstrucoesParaCadastro')}
                        > Instruções</Text>
                    </View>
                </View>

                <ModalDanger
                    visible={visibleModal === 'danger'}
                    title={'ERRO'}
                    mesage={msgModal}
                    functionBtnOK={() => setVisibleModal('')}
                />

                <ModalInfo
                    visible={visibleModal === 'info'}
                    title={'INFORMAÇÃO'}
                    mesage={msgModal}
                    functionBtnOK={() => setVisibleModal('')}
                />

            </ScrollView>
        </>
    );
}

export default LoginStackScreen = ({ navigation }) => (
    <LoginStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: colorStyle.secondary
        },
        headerTintColor: colorStyle.primary,
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <LoginStack.Screen name="Login" component={login} options={{
            title: 'Principal',
            headerLeft: () => (
                <Icon.Button name="reorder" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.openDrawer()}></Icon.Button>
            )
        }} />
    </LoginStack.Navigator>
);

const styles = StyleSheet.create({
    view1: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colorStyle.secondary,
        width: width,
        height: height * 0.4,
    },
    view2: {
        backgroundColor: colorStyle.secondary,
        justifyContent: "space-around",
        alignItems: 'center',
        width: width,
        height: height * 0.21,
    },
    view3: {
        backgroundColor: colorStyle.secondary,
        width: width,
        height: height * 0.265,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: width * 0.8,
        height: (height * 0.4) * 0.8
    },
    socialIcon: {
        height: iconStyle.socialIcon.height,
        width: iconStyle.socialIcon.width
    },
    viewIForgotMyPassword: {
        width: width,
        alignItems: 'flex-end',
        paddingHorizontal: 20
    },
    textInputIcon: {
        marginTop: 8,
        borderBottomWidth: 1,
        borderColor: colorStyle.default,
        height: 37.5
    },
    textInputIconError: {
        marginTop: 8,
        borderBottomWidth: 1,
        borderColor: colorStyle.danger,
        height: 37.5
    },
    contentTitle: {
        color: '#1075bb',
        fontSize: 30,
        marginBottom: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },

});