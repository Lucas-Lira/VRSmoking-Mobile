import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { 
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-paper';
import Moment from 'moment';
import client_io from 'socket.io-client';

import serviceConfig from '../../services/config';
const { URL } = serviceConfig;

// Importanto as Modais
import ModalDanger from '../../components/modal/danger/';
import ModalLoading from '../../components/modal/loading/';

const { width, height } = Dimensions.get('window');

// Importando estilos
import generalStyle from '../../assets/styles/general';
import configStyleJSON from '../../assets/styles/config';
const { colorStyle, iconStyle, metricStyle, fontStyle } = configStyleJSON;

var usuarioLogado = 0;

export default function Ajuda({ route, navigation }) {

    const [conversations, setConversations] = useState([]);
    const [visibleModal, setVisibleModal] = useState(``);
    const [msgModal, setMsgModal] = useState(``);
    
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', e => {

            let chatConnect = async () => {

                if(String(route.name).toLowerCase() === `ajuda`) {

                    const usr_id = await AsyncStorage.getItem('@usr_id');
                    const grp_id = await AsyncStorage.getItem('@grp_id');
    
                    const io = client_io(URL.VRSMOKING_CHAT);
    
                    // Criando a conexão do socket com o servidor
                    io.on('connect', () => {
    
                    io.on('receivingHelpScreenData', (data) => {
    
                        if (!data._mensagem) {
                            setConversations(data._result);
                        } else {
                            setMsgModal(data._mensagem);
                            setVisibleModal('danger');
                        }
    
                    });
    
                    io.emit('connectionParams', { usr_id, grp_id, screen: "ajuda" });
    
                    });
    
                }

            };

            let checkLoggedUser = async () => {
    
                const token = await AsyncStorage.getItem('@usr_token');
    
                if(token) {
    
                    const response = await api.post('/usuario/mobile/verifyToken', {
                        token
                    });
    
                    if (response.data._mensagem || response.data._erros.length > 0) 
                        navigation.navigate('Login');
                    else {

                        usuarioLogado = await AsyncStorage.getItem('@usr_id');

                        chatConnect();

                    }
    
                } else
                    navigation.navigate('Login');
    
            };
    
            checkLoggedUser();

        });
        
        return unsubscribe;

    }, [route]);

    return (
        <>
            <View style={styles.viewContainer}>
                <View style={metricStyle.flexRow}>
                    <View style={styles.viewContainerColumn}>
                        <Text style={styles.textTypeContent}>Não hesite em pedir ajuda</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.viewContainerList}>
                    {conversations.length > 0 && conversations.map(conversas => (
                        <TouchableOpacity key={conversas._id + `g`} style={ conversas._possui_novas_mensagens === 'S' ? styles.buttonListItemWithMessage : styles.buttonListItem } onPress={async () => {
                            
                            const usr_id = await AsyncStorage.getItem('@usr_id');
                            const grp_id = await AsyncStorage.getItem('@grp_id');

                            navigation.navigate('Mensagens', {
                                page_title: conversas._descricao,
                                screen: 'Mensagens',
                                params: {
                                    usr_id,
                                    grp_id,
                                    codDestino: conversas._id,
                                    tipoDestino: 'grupo'
                                }
                            }); 

                        }}>
                            <Item 
                                contentName={conversas._descricao}
                                imageUri={`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAin4VI1JuWoD-4PaDeVvZSCK9tEg7oC5yUg&usqp=CAU`} 
                                withMessage={conversas._possui_novas_mensagens}
                                obs={`Grupo tratamento (${Moment(conversas._data_criacao).format('DD/MM/YYYY')} à ${Moment(conversas._data_fechamento).format('DD/MM/YYYY')})`}/>
                        </TouchableOpacity>
                    ))}

                    {conversations.length > 0 && conversations[0]._list_grupo_participantes.map((participantes) => {

                        if (participantes._usuario._nivel_acesso === 1 && parseInt(participantes._usuario._id) != parseInt(usuarioLogado)) {

                            return (<TouchableOpacity key={participantes._usuario._id} style={ participantes._usuario._possui_novas_mensagens === 'S' ? styles.buttonListItemWithMessage : styles.buttonListItem } onPress={async () => {
                                
                                const usr_id = await AsyncStorage.getItem('@usr_id');
                                const grp_id = await AsyncStorage.getItem('@grp_id');
                                
                                navigation.navigate('Mensagens', {
                                    page_title: participantes._usuario._nome,
                                    screen: 'Mensagens',
                                    params: {
                                        usr_id,
                                        grp_id,
                                        codDestino: participantes._usuario._id,
                                        tipoDestino: 'usuario'
                                    }
                                }) 
                            }}>
                                <Item 
                                    contentName={participantes._usuario._nome}
                                    imageUri={`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFhrrvfepbkqfpP09yKEn7jr4ZXO7ML8DLiw&usqp=CAU`}
                                    withMessage={participantes._usuario._possui_novas_mensagens}
                                    obs={`${parseInt(participantes._usuario._nivel_acesso) === 1 ? 'Monitor' : 'Paciente'}`}/>
                            </TouchableOpacity>);

                        } else 
                            return;

                    })}

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

            </ScrollView>
        </>
    );
}

function Item(props) {
    return (
        <View style={props.withMessage === 'S' ? { flexDirection: 'row', backgroundColor: '#E3F2FD' } : { flexDirection: 'row', backgroundColor: '#F5F5F5' } }>
            <Avatar.Image size={50} source={{ uri: props.imageUri }} />
            <View style={ props.withMessage === 'S' ? styles.viewInfoConteudosComMensagem : styles.viewInfoConteudos }>
                <Text style={styles.textTitleContent}>{props.contentName}</Text>
                <Text style={styles.secondaryText}>{props.obs}</Text>
            </View>
            <Text style={styles.secondaryText}>02:22:33</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
      backgroundColor: '#F5F5F5',
      width: width,
      height: height
  },
  viewContainer: {
      width: width * 0.9,
      height: 50,
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
      alignItems: 'center'
  },
  viewContainerColumn: {
      width: width * 0.9,
      height: 50,
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center'
  },
  textTypeContent: {
      color: colorStyle.danger,
      fontSize: fontStyle.mediumSize,
      marginLeft: 3,
      fontWeight: 'bold'
  },
  viewContainerList: {
      width: width,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#F5F5F5',
      paddingVertical: 15
  },
  buttonListItem: {
      width: width * 0.9,
      height: 90,
      backgroundColor: '#F5F5F5',
      borderBottomWidth: 1,
      borderBottomColor: '#B0BEC5',
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 10
  },
  buttonListItemWithMessage: {
    width: width * 0.9,
    height: 90,
    backgroundColor: '#E3F2FD',
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10
},
  viewInfoConteudos: {
    backgroundColor: '#F5F5F5',
    width: width * 0.60,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  viewInfoConteudosComMensagem: {
    backgroundColor: '#E3F2FD',
    width: width * 0.60,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  textTitleContent: {
    fontWeight: "bold",
    color: colorStyle.default,
    fontSize: 17
  },
  secondaryText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: colorStyle.default
  },
});