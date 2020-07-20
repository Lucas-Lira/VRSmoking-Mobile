import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import Api from '../../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Base64 } from 'js-base64';

// Importações para manipulação do REDUX
// ===================================================================
import { connect } from 'react-redux';
// ===================================================================

// Importando estilos
import generalStyle from '../../assets/styles/general';
import configStyleJSON from '../../assets/styles/config';
const { colorStyle, iconStyle, metricStyle, fontStyle } = configStyleJSON;

// Importando URL das bases
import serviceConfig from '../../services/config';
const { URL } = serviceConfig;

// Importanto as Modais
import ModalDanger from '../../components/modal/danger/';
import ModalLoading from '../../components/modal/loading/';

const { width, height } = Dimensions.get('window');

let auxContent = [];

const ListContent = ({ navigation, route, contents }) => {

    const [conteudos, setConteudos] = useState([]);
    const [visibleModal, setVisibleModal] = useState(``);
    const [msgModal, setMsgModal] = useState(``);

    useEffect(() => {

        auxContent = contents;

        let itens_atividade = auxContent;
        let vetContents = [];
        
        let contador = 0;
        
        if(String(route.name).toLowerCase() === `pdf`) {

            for (let i = 0; i < itens_atividade.length; i++)
                if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() === '.pdf')
                    vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/obterArquivoPorIdeNome/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                    
        } else if (String(route.name).toLowerCase() === `vr`) {

            for (let i = 0; i < itens_atividade.length; i++)
                if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() === '.html')
                    vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });

        } else if (String(route.name).toLowerCase() === `vídeo`) {

            for (let i = 0; i < itens_atividade.length; i++)
                if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() !== '.pdf' && String(itens_atividade[i]._conteudo._extensao).toLowerCase() !== '.html')
                    vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/obterArquivoPorIdeNome/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                
        } else {
            for (let i = 0; i < itens_atividade.length; i++) {
                
                if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() === '.html')
                    vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                else
                    vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/obterArquivoPorIdeNome/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
            }
        }

        setConteudos(vetContents);

    }, [contents]);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', e => {

            let renderContents = async () => {

                let itens_atividade = auxContent;
                let vetContents = [];
                
                let contador = 0;
                
                if(String(route.name).toLowerCase() === `pdf`) {

                    for (let i = 0; i < itens_atividade.length; i++)
                        if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() === '.pdf')
                            vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/obterArquivoPorIdeNome/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                            
                } else if (String(route.name).toLowerCase() === `vr`) {

                    for (let i = 0; i < itens_atividade.length; i++)
                        if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() === '.html')
                            vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });

                } else if (String(route.name).toLowerCase() === `vídeo`) {

                    for (let i = 0; i < itens_atividade.length; i++)
                        if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() !== '.pdf' && String(itens_atividade[i]._conteudo._extensao).toLowerCase() !== '.html')
                            vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/obterArquivoPorIdeNome/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                        
                } else {
                    for (let i = 0; i < itens_atividade.length; i++) {
                        
                        if (String(itens_atividade[i]._conteudo._extensao).toLowerCase() === '.html')
                            vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                        else
                            vetContents.push({ index: contador++, nomeArq: itens_atividade[i]._conteudo._titulo, dataUpload: itens_atividade[i]._conteudo._data_upload, url: URL.VRSMOKING_API + `/conteudo/obterArquivoPorIdeNome/`+ itens_atividade[i]._conteudo._id + `/` + itens_atividade[i]._conteudo._nome_arquivo, extension: String(itens_atividade[i]._conteudo._extensao).toLowerCase() });
                    }
                }

                setConteudos(vetContents);

            };

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
                        renderContents();
          
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
            <View style={styles.viewContainer}>
                <View style={metricStyle.flexRow}>
                    <View style={styles.viewContainerColumn}>
                        <Text style={styles.textTypeContent}>Tudo é possível se você se dedicar.</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.viewContainerList}>
                    {conteudos.length > 0 && conteudos.map(content => {

                        // if (content.extension === '.html') {

                        //     return (
                        //         <TouchableOpacity key={content.index} style={styles.buttonListItem} onPress={() => Linking.openURL(content.url) }>

                        //             <Item
                        //                 contentName={content.nomeArq}
                        //                 obs={'Ambiente Virtual'}
                        //                 fileIcon={'ondemand-video'}/>
                                         
                        //         </TouchableOpacity>
                        //     );

                        //} else {

                            return (<TouchableOpacity key={content.index} style={styles.buttonListItem} onPress={() => navigation.navigate('Viewer', {
                                uri: content.url, 
                                extension: content.extension
                            }) }>
    
                                {
                                    content.extension === '.pdf' ? 
                                        <Item 
                                            contentName={content.nomeArq}
                                            obs={'Documento do tipo texto'}
                                            fileIcon={'library-books'}/>
                                    :
                                        content.extension === '.html' ?
                                            <Item
                                                contentName={content.nomeArq}
                                                obs={'Ambiente Virtual'}
                                                fileIcon={'ondemand-video'}/>
                                        :
                                            <Item
                                                contentName={content.nomeArq}
                                                obs={'Arquivo de Vídeo'}
                                                fileIcon={'play-circle-outline'}/>
                                }
    
                            </TouchableOpacity>)

                        //}

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
            <Icon name={props.fileIcon} size={iconStyle.large} color={colorStyle.primary} backgroundColor={'#F5F5F5'} />
            <View style={styles.viewInfoConteudos}>
                <Text style={styles.textTitleContent}>{props.contentName}</Text>
                <Text style={styles.secondaryText}>{props.obs}</Text>
            </View>
        </View>
    );
}

const mapStateToProps = state => {
  return ({
    contents: state.Content.contents
  })
};

export default connect(mapStateToProps)(ListContent);

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
        color: colorStyle.tertiary,
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
        height: 100,
        backgroundColor: '#F5F5F5',
        borderBottomWidth: 1,
        borderBottomColor: '#B0BEC5',
        justifyContent: "center",
        alignItems: "flex-start",
        //flexDirection: "row",
        padding: 10
    },
    viewInfoConteudos: {
        backgroundColor: '#F5F5F5',
        width: width * 0.675,
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
    // buttonItemList: {
    //     width: width * 0.845,
    //     //height: 60,
    //     backgroundColor: '#F5F5F5',
    // },
    // image: {
    //     marginTop: 20,
    //     width: width * 0.8,
    //     height: 200,
    // },
    // backgroundVideo: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //     width: width,
    //     height: height
    // },
    
});