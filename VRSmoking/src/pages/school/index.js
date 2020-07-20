import React, { useEffect, useState } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    View,
    Text,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import { List } from 'react-native-paper';

// Importações para manipulação dos estados com REDUX
// ===================================================================
import { connect } from 'react-redux';
import { listarConteudoPorAtividade } from '../../actions/content';
// ===================================================================

const { width, height } = Dimensions.get('window');

import generalStyle from '../../assets/styles/general';
import configStyleJSON from '../../assets/styles/config';
import ModalDanger from '../../components/modal/danger/index';
const { colorStyle, iconStyle, metricStyle } = configStyleJSON;

const School = ({ navigation, route, listarConteudoPorAtividade }) => {

  const [phases, setPhases] = useState([]);
  const [visibleModal, setVisibleModal] = useState(``);
  const [msgModal, setMsgModal] = useState(``);

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', e => {

      let loadPhases = async () => {
        try {
          
          const calendario = await AsyncStorage.getItem('@calend_id');
  
          if(calendario) {
  
              const response = await Api.get(`/mobile/fase/listarComAtividadesPorCalendario/${calendario}`);
  
              if (response.data._mensagem || response.data._erros.length > 0) {
                setMsgModal('Falha ao Listar Fases');
                setVisibleModal('danger');
              } else
                setPhases(response.data._result);
  
          } else {
            setMsgModal('Falha ao Listar Fases');
            setVisibleModal('danger');
          }
            
        } catch (e) {
          setMsgModal('Falha ao Listar Fases');
          setVisibleModal('danger');
        }
      }
    
      let checkLoggedUser = async () => {

        try {
  
          const token = await AsyncStorage.getItem('@usr_token');
  
          if(token) {
  
              const response = await Api.post('/usuario/mobile/verifyToken', {
                  token
              });
  
              if (response.data._mensagem || response.data._erros.length > 0) 
                navigation.navigate('Login');
              else 
                loadPhases();
  
          } else
              navigation.navigate('Login');
  
        } catch (e) {
          navigation.navigate('Login');
        }
  
      };
  
      checkLoggedUser();

    });

    return unsubscribe;

  }, [route]);

  return (
    <>
      <ScrollView style={generalStyle.scrollViewContainer}>
        <View style={styles.view1}>
            <Text style={generalStyle.textTitle}>Olá, vamos aprender?</Text>
            <Image
                style={styles.image}
                source={require('../../assets/images/news.png')}
            />
        </View>

        <List.AccordionGroup>
          
          {phases.map(item => (

            <List.Accordion 
              key={item._id} 
              id={item._id}
              title={item._titulo}
              titleStyle={{ fontSize: 16 }}
              titleNumberOfLines={3}
              description={item._descricao}
              descriptionStyle={{ fontSize: 12 }}
              descriptionNumberOfLines={5}
              left={props => <List.Icon color={colorStyle.default} icon="folder-open" />}
              style={styles.accordion}
            >
              <View style={{ justifyContent: 'center' }}>
                
                {item._list_atividades.map(fase_atividade => (
                  <List.Item 
                    key={fase_atividade._atividade._id}
                    onPress={() => {

                      listarConteudoPorAtividade(fase_atividade._atividade._id);
                      
                      navigation.navigate('Content', {
                        fase_descricao: item._titulo,
                        atividade_titulo: fase_atividade._atividade._titulo,
                        screen: 'ContentsTab',
                        params: {
                            atividade: fase_atividade._atividade._id
                        },
                      });

                    }}
                    title={fase_atividade._atividade._titulo}
                    titleStyle={{ fontSize: 14 }}
                    titleNumberOfLines={3}
                    description={fase_atividade._atividade._descricao}
                    descriptionStyle={{ fontSize: 12 }}
                    descriptionNumberOfLines={4}
                    
                    left={props => <List.Icon {...props} color={colorStyle.default} icon="ballot" />} 
                    right={props => <List.Icon {...props} color={colorStyle.default} icon="chevron-right" />} 
                  />
                ))}

              </View>

            </List.Accordion>

          ))}

        </List.AccordionGroup>

        <ModalDanger
            visible={visibleModal === 'danger'}
            title={'ERRO'}
            mesage={msgModal}
            functionBtnOK={() => setVisibleModal('')}
        />

      </ScrollView>
    </>
  );
}

// const mapStateToProps = state => ({
//     io: state.ChatMessage.io,
//     messages: state.ChatMessage.messages,
// });

export default connect(null, { listarConteudoPorAtividade })(School);

const styles = StyleSheet.create({

  view1: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorStyle.secondary,
    width: width,
    height: height * 0.4,
  },
  image: {
    width: width * 0.8,
    height: (height * 0.4) * 0.8
  },
  accordion: {
    fontSize: 13
  },
  accordionItem: {
    fontSize: 12
  }

});

