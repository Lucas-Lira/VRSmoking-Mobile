import React, { useState, useEffect } from 'react';
import Api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    Dimensions,
    Text,
    Alert,
    FlatList,
    Linking
} from 'react-native';

const { width } = Dimensions.get('window');

// Importando estilos
import generalStyle from '../../assets/styles/general/';
import configStyleJSON from '../../assets/styles/config/';
const { colorStyle } = configStyleJSON;

import { 
    Card,
    CardTitle,
    CardContent,
    CardAction,
    CardButton,
    CardImage
} from 'react-native-cards';

export default function home({ navigation, route }) {

    const DATA = [
        {
          id: '1',
          title: 'Fumar aumenta o risco de infecção e forma grave de vírus, diz estudo',
          image_uri: 'https://veja.abril.com.br/wp-content/uploads/2019/01/saude-tabagismo-20161221-002.jpg?quality=70&strip=info&resize=680,453',
          image_descr: 'Publicado em 26/05/2020',
          abstract: 'Pesquisa americana sugere que pulmão de fumantes tem mais receptores usados pelo coronavírus para invadir as células...',
          author: 'Por Giulia Vidale - 6 Oct 2019, 12h15',
          link: 'https://veja.abril.com.br/saude/fumar-aumenta-o-risco-de-infeccao-e-forma-grave-de-coronavirus-diz-estudo/'
        },
        {
          id: '3',
          title: 'Risco de desenvolver doenças no pulmão sobe 30% com uso de cigarros eletrônicos, diz estudo',
          image_uri: 'https://www.rbsdirect.com.br/imagesrc/25449392.jpg?w=170&h=113&a=c',
          image_descr: 'Atualizada em 16/12/2019 - 19h15min',
          abstract: 'Um estudo que acompanhou 32 mil americanos durante três anos mostra que os consumidores de cigarros eletrônicos aumentaram seu risco de desenvolver as mesmas doenças pulmonares crônicas que os fumantes comuns. Os dados, divulgados nesta segunda-feira (16), são da pesquisa sobre...',
          author: 'Por Giulia Vidale - 6 Oct 2019, 12h15',
          link: 'https://gauchazh.clicrbs.com.br/saude/noticia/2019/12/risco-de-desenvolver-doencas-no-pulmao-sobe-30-com-uso-de-cigarros-eletronicos-diz-estudo-ck48sbxrq00d901p55nkgpxcc.html'
        },
        {
          id: '2',
          title: 'Estudo avalia eficácia da nicotina contra coronavírus',
          image_uri: 'https://veja.abril.com.br/wp-content/uploads/2019/01/saude-tabagismo-20161221-002.jpg?quality=70&strip=info&resize=680,453',
          image_descr: 'Publicado em 28/05/2020',
          abstract: 'Uma equipe de pesquisadores na França acredita que a substância pode impedir o vírus de entrar na célula; proposta foi criticada por entidades de saúde...',
          author: 'Por Giulia Vidale - 6 Oct 2019, 12h15',
          link: 'https://veja.abril.com.br/saude/estudo-avalia-eficacia-da-nicotina-contra-coronavirus/'
        },
        {
            id: '4',
            title: 'Confirmadas nos EUA duas novas mortes de fumantes de cigarro eletrônico em um só dia',
            image_uri: 'https://imagens.brasil.elpais.com/resizer/0mPHS_-1ABxMWZ5rztpHJWpo8Xg=/1000x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/TI5HUL4NAI5XBE2VC74QCXJT3U.jpg',
            image_descr: 'Nova York - 06 SEP 2019 - 21:39 BRT',
            abstract: 'São quatro casos registrados; a chefa do grupo de pesquisa que analisa o aumento de doenças pulmonares nesses fumantes recomenda deixar de usar os dispositivos...',
            author: 'SANDRO POZZI',
            link: 'https://brasil.elpais.com/brasil/2019/09/06/internacional/1567789379_376478.html'
        }
    ];

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', e => {

            let checkLoggedUser = async () => {

                const token = await AsyncStorage.getItem('@usr_token');
    
                if(token) {
    
                    const response = await Api.post('/usuario/mobile/verifyToken', {
                        token
                    });
    
                    if (response.data._mensagem || response.data._erros.length > 0) 
                        navigation.navigate('Login');
    
                } else
                    navigation.navigate('Login');
    
            };
    
            checkLoggedUser();

        });

        return unsubscribe;

    }, [route]);

    function renderItem({ item }) {
        return (
            <Card>
                <Text style={[generalStyle.textTitle, { padding: 7 }]}>{item.title}</Text>
                <CardImage
                    source={{ uri: item.image_uri }}
                    title={item.image_descr}
                />
                <CardTitle
                    subtitle={item.author}
                    
                />
                <CardContent style={styles.fontText} text={item.abstract} />
                <CardAction
                    separator={true}
                    inColumn={false}>
                    <CardButton
                        onPress={() => Linking.openURL(item.link)}
                        title="Saiba Mais"
                        color={colorStyle.primary}
                    />
                    <CardButton
                        onPress={() => Alert.alert('To Share')}
                        title="Compartilhar"
                        color={colorStyle.primary}
                    />
                </CardAction>
            </Card>
        );
    }

    return (
        <>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                //onRefresh={onRefresh}
                //refreshing={pRefreshing}
                //extraData={selected}
            />
        </>
    );
}

const styles = StyleSheet.create({

    viewCardAction: {
        width: width * 0.3,
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    }

});