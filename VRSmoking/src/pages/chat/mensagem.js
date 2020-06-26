import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { TextInput } from 'react-native-paper';

// Importando estilos
import configStyleJSON from '../../assets/styles/config';
//import generalStyle from '../../assets/styles/general';
const { colorStyle, iconStyle, metricStyle, fontStyle } = configStyleJSON;

const { width, height } = Dimensions.get('window');

const Mensagem = () => {

  const [messages, setMessages] = useState([{
    id: 1,
    mensagem: 'Teste gfdgdfg'
  },
  {
    id: 2,
    mensagem: 'Teste ggdf gdfgdfg fdgdfgdfggdf',
    usuario: 1,
  }
  ,
  {
    id: 3,
    mensagem: 'Testefdg gdfgdf gdf gfdgdfgf',
    usuario: 2,
  }
  ,
  {
    id: 4,
    mensagem: 'Testetwttertertertr',
    usuario: 1,
  }
  ,
  {
    id: 5,
    mensagem: 'Teste fsdfsdfsdfsdfs',
    usuario: 1,
  }
  ,
  {
    id: 6,
    mensagem: 'Testefsdfsdfsdfsdfsd',
    usuario: 1,
  }
  ,
  {
    id: 7,
    mensagem: 'Teste ffdsfsdfsd',
    usuario: 2,
  }
  ,
  {
    id: 8,
    mensagem: 'Testedsfsdfsd',
    usuario: 2,
  }
  ,
  {
    id: 9,
    mensagem: 'Testefsdfsdfsd',
    usuario: 1,
  }
  ,
  {
    id: 10,
    mensagem: 'Testefsdf ',
    usuario: 2,
  }
  ,
  {
    id: 11,
    mensagem: 'Testefsdfsdfsdfsdfsdfsdfsd',
    usuario: 2,
  }
  ,
  {
    id: 12,
    mensagem: 'Teste fsdfsff',
    usuario: 1,
  }
  ,
  {
    id: 13,
    mensagem: 'Teste fsd',
    usuario: 1,
  }
  ,
  {
    id: 14,
    mensagem: 'Teste fsdf',
    usuario: 1,
  }
  ,
  {
    id: 15,
    mensagem: 'Teste fsfsdfsdfsdfsdfsd',
    usuario: 2, 
  }
  ,
  {
    id: 16,
    mensagem: 'Teste fs',
    usuario: 1,
  }
  ,
  {
    id: 17,
    mensagem: 'Testefsd',
    usuario: 2,
  }
  ,
  {
    id: 18,
    mensagem: 'Teste fsfdfsdfsdfsd ',
    usuario: 1,
  }
  ,
  {
    id: 19,
    mensagem: 'Teste fsdfsd',
    usuario: 1,
  }]);
  const [msgSend, setMsgSend] = useState(``);
  const [validationMsgSend, setValidationMsgSend] = useState(``);

  useEffect(() => {

    const listarMensagens = () => {
  
      try {
  
        setMessages([
          {
            id: 1,
            mensagem: 'Teste gfdgdfg'
          },
          {
            id: 2,
            mensagem: 'Teste ggdf gdfgdfg fdgdfgdfggdf',
            usuario: 1,
          }
          ,
          {
            id: 3,
            mensagem: 'Testefdg gdfgdf gdf gfdgdfgf',
            usuario: 2,
          }
          ,
          {
            id: 4,
            mensagem: 'Testetwttertertertr',
            usuario: 1,
          }
          ,
          {
            id: 5,
            mensagem: 'Teste fsdfsdfsdfsdfs',
            usuario: 1,
          }
          ,
          {
            id: 6,
            mensagem: 'Testefsdfsdfsdfsdfsd',
            usuario: 1,
          }
          ,
          {
            id: 7,
            mensagem: 'Teste ffdsfsdfsd',
            usuario: 2,
          }
          ,
          {
            id: 8,
            mensagem: 'Testedsfsdfsd',
            usuario: 2,
          }
          ,
          {
            id: 9,
            mensagem: 'Testefsdfsdfsd',
            usuario: 1,
          }
          ,
          {
            id: 10,
            mensagem: 'Testefsdf ',
            usuario: 2,
          }
          ,
          {
            id: 11,
            mensagem: 'Testefsdfsdfsdfsdfsdfsdfsd',
            usuario: 2,
          }
          ,
          {
            id: 12,
            mensagem: 'Teste fsdfsff',
            usuario: 1,
          }
          ,
          {
            id: 13,
            mensagem: 'Teste fsd',
            usuario: 1,
          }
          ,
          {
            id: 14,
            mensagem: 'Teste fsdf',
            usuario: 1,
          }
          ,
          {
            id: 15,
            mensagem: 'Teste fsfsdfsdfsdfsdfsd',
            usuario: 2, 
          }
          ,
          {
            id: 16,
            mensagem: 'Teste fs',
            usuario: 1,
          }
          ,
          {
            id: 17,
            mensagem: 'Testefsd',
            usuario: 2,
          }
          ,
          {
            id: 18,
            mensagem: 'Teste fsfdfsdfsdfsd ',
            usuario: 1,
          }
          ,
          {
            id: 19,
            mensagem: 'Teste fsdfsd',
            usuario: 1,
          }
        ]);
  
      } catch (e) {
  
      }
  
    };
  
    listarMensagens();
  
  }, []);

  return (
      <>

        <View style={styles.viewContainer}>
            <View style={metricStyle.flexRow}>
                <View style={styles.viewContainerColumn}>
                    <Text style={styles.textTypeContent}>Fale sobre seu progresso</Text>
                </View>
            </View>
        </View>

        <ScrollView style={styles.scrollViewContainer}>

          {messages.map(menssage => {

            let pAlign = '';

            if (menssage.usuario === 1)
              pAlign = 'flex-end';
            else
              pAlign = 'flex-start';

            return (<View key={menssage.id} style={{ width: width * 0.9, alignItems: pAlign }}>
              <Texto
                mensagem={menssage.mensagem} />
            </View>);
          })}

        </ScrollView>

        <View style={styles.viewRodape}>

          <TextInput
              mode="outlined"
              style={styles.textInputPrimary}
              //error={setValidationMsgSend !== ''}
              inlineImageLeft='mood'
              inlineImagePadding={iconStyle.inlineImagePadding}
              placeholder="Digite uma mensagem..."
              value={msgSend}
              //selectionColor={colorStyle.primary}
              //keyboardType={'email-address'}
              onChangeText={setMsgSend}
              returnKeyType={"next"}
              blurOnSubmit={false}
              underlineColor="transparent"
          />

          <TouchableOpacity
            style={styles.btnSend}>
               <Icon
                name='send' // close
                color={`#37474F`}
                size={iconStyle.size}
              />
          </TouchableOpacity>
           
        </View>

      </>
  );
}

function Texto(props) {

  let pWidth = 0;
  let pHeight = 0;

  if (props.mensagem.length > 46)
    pWidth = width * 0.75
  else
    pWidth = ((props.mensagem.length * 0.015) + 0.05) * width;

  return (
      <View style={{ 
        width: pWidth,
        backgroundColor: colorStyle.primary,
        borderRadius: 4,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: "center",
        padding: 3 }}>
          <Text style={styles.textoMensagem}>{props.mensagem}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  btnSend: {
    borderRadius: 50,
    backgroundColor: colorStyle.tertiary,
    width: width * 0.15,
    height: height * 0.08,
    marginTop: height * 0.01,
    justifyContent: 'center',
    alignItems: "center"
  },
  textInputPrimary: {
    height: height * 0.073,
    alignSelf: 'stretch',
    backgroundColor: '#CFD8DC',
    fontSize: fontStyle.regularSize,
    marginTop: height * 0.013,
    color: '#000',
    width: width * 0.75,
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderWidth: 0,
    padding: 10,
    fontSize: 15
 },
  viewRodape: {
    backgroundColor: '#F5F5F5',
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollViewContainer: {
    backgroundColor: '#F5F5F5',
    width: width,
    height: height * 0.82,
    paddingHorizontal: 15
  },
  viewContainer: {
    width: width * 0.9,
    height: height * 0.08,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  viewContainerColumn: {
      width: width * 0.9,
      height: height * 0.08,
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center'
  },
  textTypeContent: {
      color: colorStyle.tertiary,
      fontSize: fontStyle.mediumSize,
      marginLeft: 3,
      fontWeight: 'bold'
  },
  // viewContainerTextoMensagem: {
  //   height: 30,
  //   backgroundColor: colorStyle.primary,
  //   borderRadius: 2,
  //   marginBottom: 10,
  //   alignItems: 'flex-end',
  //   justifyContent: "center",
  // },
  textoMensagem: {
    color: colorStyle.secondary,
    fontSize: 13,
    fontFamily: fontStyle.primary,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
    textAlign: 'center',
    borderRadius: 4,
  }

});

// Stack Navigator
// ===========================================
const MensagemStack = createStackNavigator();

const MensagemStackScreen = ({ navigation }) => {
    return (
        <MensagemStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colorStyle.secondary,
            },
            headerTintColor: colorStyle.primary,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>

            <MensagemStack.Screen name="Mensagens" component={Mensagem} options={{
                title: 'Mensagens',
                headerLeft: () => (
                    <Icon.Button name="arrow-back" size={25} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.goBack()}></Icon.Button>
                ),
                headerRight: () => (
                  <View style={{ flexDirection: 'row' }}>
                    <Icon.Button name="videocam" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                    <Icon.Button name="call" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                    <Icon.Button name="more-vert" size={iconStyle.size} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => {  }} />
                  </View>
                )
            }} />

        </MensagemStack.Navigator>
    );
}

export default MensagemStackScreen;
