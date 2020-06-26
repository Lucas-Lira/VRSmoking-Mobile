import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importando estilos
import generalStyle from '../../assets/styles/general/';
import configStyleJSON from '../../assets/styles/config/';
const { colorStyle, iconStyle, metricStyle } = configStyleJSON;

const InstructionsStack = createStackNavigator();

const { width, height } = Dimensions.get('window');

function Instructions({ navigation }) {
    return (
        <>
            <ScrollView style={generalStyle.scrollViewContainer}>
                <View style={styles.viewContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/register.png')}
                    />
                    <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Como Me Cadastrar?</Text>
                    <Text style={[generalStyle.textDefault, metricStyle.mt30]}>    Para se cadastrar é fácil, basta fazer uma visita na clínica de fisioterapia da Universidade do Oeste Paulista localizada na Rua José Bongiovani, número 700 - Cidade Universitária em Pres. Prudente – SP. Lá você conseguira todas as informações necessárias para fazer parte do tratamento.</Text>

                    <Icon
                        style={metricStyle.mt10}
                        name='more-horiz'
                        color={colorStyle.primary}
                        size={iconStyle.size}
                    />

                    <TouchableOpacity
                        style={[generalStyle.btnPrimary, metricStyle.mt10]}
                        onPress={() => navigation.goBack()}
                    >
                        <View>
                            <Text style={generalStyle.btnDefaultText}>Voltar</Text>
                        </View>

                    </TouchableOpacity>

                </View>
            </ScrollView>
        </>
    );
}

export default InstructionsStackScreen = ({ navigation }) => (
    <InstructionsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: colorStyle.secondary,
        },
        headerTintColor: colorStyle.primary,
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <InstructionsStack.Screen name="Instructions" component={Instructions} options={{
            title: 'Instruções',
            headerLeft: () => (
                <Icon.Button name="arrow-back" size={25} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.goBack()}></Icon.Button>
            )
        }} />
    </InstructionsStack.Navigator>
);

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: colorStyle.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginTop: 20,
        width: width * 0.8,
        height: 200,
    },
});