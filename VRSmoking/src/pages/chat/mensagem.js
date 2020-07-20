import React, { useState, useEffect, createRef } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import client_io from 'socket.io-client';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';

// Importações para manipulação do REDUX
// ===================================================================
import { connect } from 'react-redux';
// ===================================================================

import Api from '../../services/api';
import serviceConfig from '../../services/config';
const { URL } = serviceConfig;

// Importanto as Modais
import ModalDanger from '../../components/modal/danger/';
import ModalLoading from '../../components/modal/loading/';

// Importando estilos
import configStyleJSON from '../../assets/styles/config';
const { colorStyle, iconStyle, metricStyle, fontStyle } = configStyleJSON;

const { width, height } = Dimensions.get('window');

var io = null;

const Mensagem = ({ route, navigation }) => {

  this.myScroll = createRef();

  const [messages, setMessages] = useState([]);
  const [msgSend, setMsgSend] = useState(``);
  const [visibleModal, setVisibleModal] = useState(``);
  const [msgModal, setMsgModal] = useState(``);

  useEffect(() => {

    setMessages([]);

    const unsubscribe = navigation.addListener('focus', (evento) => {

      let chatConnection = () => {

        try {

          // const usr_id = await AsyncStorage.getItem('@usr_id');
          // const grp_id = await AsyncStorage.getItem('@grp_id');

          const usr_id = route.params.usr_id;
          const grp_id = route.params.grp_id;
    
          io = client_io(URL.VRSMOKING_CHAT);
    
          // Criando a conexão do socket com o servidor
          io.on('connect', () => {
    
            io.emit('connectionParams', { usr_id, grp_id, screen: "mensagens" });
    
            io.on('receivingMessageScreenData', (data) => {
    
              let renderMessage = async () => {

                if (!data._mensagem) {
   
                  let result = data._result;
                  let vet_mensagens = [];
                  let list_mensagens_update = [];
                  let tipoUsuario = 0;
                  let data_entrega = null;
                  
                  for (let i = 0; i < result.length; i++) {

                    // Alterar o estado da mensagem, caso o destino for este usuário

                    if (result[i]._usuario_origem._id === parseInt(usr_id))
                      tipoUsuario = 1;
                    else {

                      tipoUsuario = 2;

                      if (result[i]._entregue === 'N' && ((result[i]._usuario_destino && parseInt(result[i]._usuario_destino._id) === parseInt(usr_id)) || (result[i]._grupo_destino && parseInt(result[i]._grupo_destino._id) === parseInt(grp_id)))) // Não foi entregue nem visualizado
                      {

                        list_mensagens_update.push({
                          _id: result[i]._id,
                          _data_entrega: Moment().format('YYYY-MM-DD hh:mm:ss'),
                          _entregue: 'S',
                          _visualizado: 'S'
                        });

                        data_entrega = Moment().format('YYYY-MM-DD hh:mm:ss');

                      } else { // Foi entregue

                        if (result[i]._visualizado === 'N' && ((result[i]._usuario_destino && parseInt(result[i]._usuario_destino._id) === parseInt(usr_id)) || (result[i]._grupo_destino && parseInt(result[i]._grupo_destino._id) === parseInt(grp_id)))) { // Não foi visualizado

                          list_mensagens_update.push({
                            _id: result[i]._id,
                            _data_entrega: result[i]._data_entrega,
                            _entregue: result[i]._entregue,
                            _visualizado: 'S'
                          });

                        }

                        data_entrega = result[i]._data_entrega;

                      }

                    }

                    vet_mensagens.push({
                      id: result[i]._id,
                      nome_usuario_origem: result[i]._usuario_origem._nome_usuario,
                      mensagem: result[i]._mensagem,
                      data_envio: result[i]._data_envio,
                      data_entrega,
                      entregue: `S`,
                      visualizado: `S`,
                      tipoUsuario
                    });

                  }

                  setMessages(vet_mensagens);

                  // FAzer requisição para alteração dos dados
                  io.emit('atualizarListadeMensagens', list_mensagens_update);

                } else {
                    setMsgModal(data._mensagem);
                    setVisibleModal('danger');
                }

              };

              renderMessage();

            });
    
            // Enviando dados para a busca das mensagens
            io.emit('connectionParamsMessages', { origem: usr_id, destino: route.params.codDestino, tipoDestino: route.params.tipoDestino });
    
          });
    
        } catch (e) {
          console.log('Falha na conexão com o socket na tela de mensagens')
        }
    
      };
    

      let checkLoggedUser = async () => {

        const token = await AsyncStorage.getItem('@usr_token');

        if(token) {

            const response = await Api.post('/usuario/mobile/verifyToken', {
                token
            });

            if (response.data._mensagem || response.data._erros.length > 0) 
                navigation.navigate('Login');
            else
              chatConnection();

        } else
            navigation.navigate('Login');

      };

      checkLoggedUser();

    });

    return unsubscribe;
  
  }, [route]);

  useEffect(() => {

    let autoScrollView = () => {
      this.myScroll.current.scrollToEnd({ animated: false });
    };

    autoScrollView();
    
  }, [messages]);

  let sendMessage = async () => {

    try {

      const usr_id = await AsyncStorage.getItem('@usr_id');
      const grp_id = await AsyncStorage.getItem('@grp_id');

      io.emit('sendMessage', { 
        origem: usr_id,
        destino: route.params.codDestino,
        tipoDestino: route.params.tipoDestino,
        msg: msgSend,
        grupo: grp_id
      });

      setMsgSend(``);

    } catch (e) {
      console.log('Falha ao enviar mensagem (tela de mensagens)');
    }

  };

  return (
      <>

        <View style={styles.viewContainer}>
            <View style={metricStyle.flexRow}>
                <View style={styles.viewContainerColumn}>
                  <Text style={styles.textTypeContent}>Fale sobre seu progresso</Text>
                </View>
            </View>
        </View>

        <ScrollView 
          style={styles.scrollViewContainer}
          ref={this.myScroll}>
          { messages.length > 0 && messages.map(menssage => {

            let pAlign = '';

            if (menssage.tipoUsuario === 1)
              pAlign = 'flex-end';
            else
              pAlign = 'flex-start';

            return (<View key={menssage.id} style={{ width: width * 0.9, alignItems: pAlign }}>
              <Texto
                mensagem={menssage.mensagem}
                nomeUsuarioOrigem={menssage.nome_usuario_origem} />
            </View>);

          })}

        </ScrollView>

        <View style={styles.viewRodape}>

          <TextInput
              mode="outlined"
              style={styles.textInputPrimary}
              inlineImageLeft='mood'
              inlineImagePadding={iconStyle.inlineImagePadding}
              placeholder="Digite uma mensagem..."
              value={msgSend}
              onChangeText={setMsgSend}
              returnKeyType={"next"}
              blurOnSubmit={false}
              underlineColor="transparent"
          />

          <TouchableOpacity
            onPress={() => sendMessage()}
            style={styles.btnSend}>
               <Icon
                name='send' // close
                color={`#37474F`}
                size={iconStyle.size}
              />
          </TouchableOpacity>
           
        </View>

        <ModalDanger
            visible={visibleModal === 'danger'}
            title={'ERRO'}
            mesage={msgModal}
            functionBtnOK={() => setVisibleModal(``)}
        />

        <ModalLoading 
            visible={visibleModal === `loading`}
            title={`Aguarde, carregando ...`}
        />

      </>
  );
}

function Texto(props) {

  let pWidth = 0;
  let pHeight = 0;

  if (props.mensagem.length > props.nomeUsuarioOrigem.length) {
    if (props.mensagem.length > 46)
      pWidth = width * 0.75
    else
      pWidth = ((props.mensagem.length * 0.015) + 0.05) * width;
  } else {

    if (props.nomeUsuarioOrigem.length > 46)
      pWidth = width * 0.75
    else
      pWidth = ((props.nomeUsuarioOrigem.length * 0.015) + 0.05) * width;
      
  }

  pWidth += 5;

  return (
      <View style={{ 
        width: pWidth,
        backgroundColor: colorStyle.primary,
        borderRadius: 4,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: "center",
        padding: 3 }}>
          <Text style={styles.textoNomeOrigem}>{props.nomeUsuarioOrigem}</Text>
          <Text style={styles.textoMensagem}>{props.mensagem}</Text>
      </View>
  );
}

const mapStateToProps = state => {
  return ({
    io: state.ChatMessage.io,
    messages: state.ChatMessage.messages,
  })
};

export default connect(mapStateToProps)(Mensagem);

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
  textoNomeOrigem: {
    color: colorStyle.tertiary,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: fontStyle.primary,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 4,
  },
  textoMensagem: {
    color: colorStyle.secondary,
    fontSize: 13,
    fontFamily: fontStyle.primary,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 4,
  }
});