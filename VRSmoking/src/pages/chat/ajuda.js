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

export default function Ajuda({ navigation }) {

    const [conversations, setConversations] = useState([]);
    const [visibleModal, setVisibleModal] = useState(``);
    const [msgModal, setMsgModal] = useState(``);

    useEffect(() => {

        let checkLoggedUser = async () => {

            const token = await AsyncStorage.getItem('@usr_token');

            if(token) {

                const response = await api.post('/usuario/mobile/verifyToken', {
                    token
                });

                if (response.data._mensagem || response.data._erros.length > 0) 
                    navigation.navigate('Login');

            } else
                navigation.navigate('Login');

        };

        // Filtrar por nível de acesso
        let carregarConversas = async () => {

            setConversations([ {
                "_id": 18,
                "_descricao": "Grupo 02/2020",
                "_data_criacao": "2020-05-23T03:00:00.000Z",
                "_data_fechamento": "2020-08-24T03:00:00.000Z",
                "_calendario": {
                  "_id": 17,
                  "_titulo": "Calendário 2",
                  "_descricao": "Este Calendário Visa...",
                  "_list_fases": [],
                  "_list_atividades": []
                },
                "_list_grupo_participantes": [
                  {
                    "_grupo": {
                      "_id": 18,
                      "_descricao": "Grupo 02/2020",
                      "_data_criacao": "2020-05-23T03:00:00.000Z",
                      "_data_fechamento": "2020-08-24T03:00:00.000Z",
                      "_calendario": {
                        "_id": 17,
                        "_titulo": "Calendário 2",
                        "_descricao": "Este Calendário Visa...",
                        "_list_fases": [],
                        "_list_atividades": []
                      },
                      "_list_grupo_participantes": []
                    },
                    "_usuario": {
                      "_id": 11,
                      "_nome": "Monitor 1",
                      "_nivel_acesso": 1,
                      "_rg": "123456789",
                      "_cpf": "863.357.430-60",
                      "_data_nascimento": "1994-06-25T03:00:00.000Z",
                      "_genero": "Masculino",
                      "_nome_usuario": "usuario 1",
                      "_senha": "",
                      "_email": "usuario@gmail.com",
                      "_telefone_celular": "(11) 11111-1111",
                      "_token": 26,
                      "_endereco": ""
                    }
                  }
                ]
            } ]);

        };

        checkLoggedUser();
        carregarConversas();

    }, []);

    return (
        <>
            <View style={styles.viewContainer}>
                <View style={metricStyle.flexRow}>
                    <View style={styles.viewContainerColumn}>
                        <Text style={styles.textTypeContent}>Compartilhe suas experiências</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.viewContainerList}>
                    {conversations.map(conversas => (
                        <TouchableOpacity key={conversas._id + `g`} style={styles.buttonListItem} onPress={() => navigation.navigate('Mensagens') }>
                            <Item 
                                contentName={conversas._descricao}
                                imageUri={`https://reactnative.dev/img/tiny_logo.png`}
                                obs={`Grupo tabagismo (${Moment(conversas._data_criacao).format('DD/MM/YYYY')} à ${Moment(conversas._data_fechamento).format('DD/MM/YYYY')})`}/>
                        </TouchableOpacity>
                    ))}

                    {conversations.length > 0 && conversations[0]._list_grupo_participantes.map(participantes => {

                        if (participantes._usuario._nivel_acesso === 1) {
                            return (<TouchableOpacity key={participantes._usuario._id} style={styles.buttonListItem} onPress={() => navigation.navigate('Mensagens') }>
                                        <Item 
                                            contentName={participantes._usuario._nome}
                                            imageUri={`https://reactnative.dev/img/tiny_logo.png`}
                                            obs={`${parseInt(participantes._usuario._nivel_acesso) === 1 ? 'Monitor' : 'Paciente'}`}/>
                                    </TouchableOpacity>);
                        }

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
        <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5' }}>
            <Avatar.Image size={50} source={{ uri: props.imageUri }} />
            <View style={styles.viewInfoConteudos}>
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
  viewInfoConteudos: {
    backgroundColor: '#F5F5F5',
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