import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    View,
    Text,
    ScrollView, 
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// Importando estilos
import configStyleJSON from '../../assets/styles/config';
import generalStyle from '../../assets/styles/general';
const { colorStyle, iconStyle, metricStyle, fontStyle } = configStyleJSON;

const ManualSistema = ({ navigation }) => {

    return (
        <>
            <ScrollView style={generalStyle.scrollViewContainer}>
                <View style={styles.viewContainer}>
                    
                    {/* Introdução */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Introdução</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>   O manual do sistema, tem como objetivo apresentar algumas das interfaces e funcionalidades que o sistema disponibiliza, a fim de facilitar a interação do usuário com o mesmo.  </Text>

                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Login</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>  A Figura 1 apresentada abaixo representa a tela de login do VRSmoking, ela serve como uma interface entre o usuário e as funcionalidades principais do sistema. Para acessa-las basta informar e-mail e senha previamente cadastrados.  </Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 1</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/login.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    <Text style={[styles.textDefault, metricStyle.mt30]}>  Além disso a tela de login permite ao usuário acessar outras telas do sistema como a tela de instruções para cadastro no programa de tratamento ou para recuperação de senha (links na parte inferior da tela).  </Text>


                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Menu Lateral</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>  O menu lateral ou drawer navigator é um menu do sistema que pode ser acionado apenas passando o dedo na tela, “puxando” para o lado direito, outra forma de acessa-lo é através do ícone com quatro barras (semelhante a um hambúrguer), que se encontra na lateral esquerda no topo do aplicativo.  </Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 2</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/drawerNavigator.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    <Text style={[styles.textDefault, metricStyle.mt30]}>    Esse menu permite ao usuário acessar a tela de login e o manual do sistema. Além disse permite que o usuário saia da aplicação (logout).</Text>

                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Instruções para Cadastro</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>    A Figura 3 apresentada abaixo, descreve em detalhes quais são os passos que o usuário deve seguir para se inscrever no programa de tratamento para tabagismo, disponibilizado pela clínica de fisioterapia da Universidade do Oeste Paulista.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 3</Text>
                    </View>
                    
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/instruçõesCadastro.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Página Principal</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>    A página principal apresentada por meio da Figura 4 é a primeira página que o usuário tem acesso depois de logado. Através dela o usuário pode visualizar as principais informações sobre o tabagismo e os riscos que essa prática traz a saúde.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 4</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/noticias.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    <Text style={[styles.textDefault, metricStyle.mt30]}>    Além disso ela possui um menu na parte inferior da tela que permite ao usuário acessar as demais funcionalidades, como por exemplo, fases, atividades, chat, entre outras.</Text>


                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Escola</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>    A Figura 5 apresenta a miniescola do VRSmoking, através dela o usuário poderá acessar as fases e atividades disponibilizadas pelo fisioterapeuta, cada fase é composta por atividades e serão disponibilizadas de acordo com o cronograma definido pelo fisioterapeuta responsável. Ao clicar em uma atividade o usuário será direcionada para a tela onde são listados os conteúdos da atividade e poderá acessá-los quando desejar.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 5</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/fases.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Conteúdos</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>    A Figura 6 abaixo apresenta a tela de conteúdo. Essa tela é responsável por disponibilizar os conteúdos de cada atividade selecionada pelo usuário. Dentre os conteúdos que podem ser disponibilizados nesta tela temos, PDF’s, vídeos e ambientes virtuais elaborados com o Framework A-Frame. Na parte superior da tela há um menu que permite ao usuário filtrar os conteúdos por tipo.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 6</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/conteudos.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    <Text style={[styles.textDefault, metricStyle.mt30]}>    A Figura 7 ilustra um ambiente virtual renderizado através do aplicativo.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 7</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/ambienteVirtual.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    {/*  */}

                    <View style={styles.viewTitulo}>
                        <Text style={[generalStyle.textTitle, metricStyle.mt20]}>Chat</Text>
                    </View>
                    <Text style={[styles.textDefault, metricStyle.mt30]}>    O Chat é o meio de comunicação disponibilizado pelo VRSmoking para que os usuários possam trocar experiências uns com os outros. Basta clicar em uma conversa para começar a enviar e receber mensagens dos colegas.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 8</Text>
                    </View>

                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/conversas.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    <Text style={[styles.textDefault, metricStyle.mt30]}>    A Figura 9 destaca a aba de ajuda, nela o usuário/paciente terá disponível a lista de monitores cadastrados e poderá pedir ajuda caso passe por alguma dificuldade ou tenha momentos de fissura.</Text>
                    
                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Figura 9</Text>
                    </View>
                    
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/manual/ajuda.jpg')}
                    />

                    <View style={styles.viewTituloImagem}>
                        <Text style={[styles.topoFigura, metricStyle.mt20]}>Fonte: VRSmoking</Text>
                    </View>

                    <Icon
                        style={metricStyle.mt10}
                        name='more-horiz'
                        color={colorStyle.primary}
                        size={iconStyle.size}
                    />

                </View>
            </ScrollView>
        </>
    );

};

const ManualStack = createStackNavigator();

const ManualStackScreen = ({ route, navigation }) => {
  return (
      <ManualStack.Navigator screenOptions={{
          headerStyle: {
              backgroundColor: colorStyle.secondary,
          },
          headerTintColor: colorStyle.primary,
          headerTitleStyle: {
              fontWeight: 'bold'
          }
      }}>

          <ManualStack.Screen 
            name="Mensagens" 
            component={ManualSistema}
            options={{
              title: 'Manual do Sistema',
              headerLeft: () => (
                  <Icon.Button name="arrow-back" size={25} color={colorStyle.primary} backgroundColor={colorStyle.secondary} onPress={() => navigation.goBack() }></Icon.Button>
              )
            }} />

      </ManualStack.Navigator>
  );
}

export default ManualStackScreen;

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
        height: 500,
    },
    textDefault: {
        color: colorStyle.default,
        textAlign: "justify",
        fontSize: fontStyle.mediumSize,
        width: width * 0.9,
        fontFamily: fontStyle.secondary,
    },
    topoFigura: {
        color: colorStyle.default,
        textAlign: "center",
        fontSize: 14,
        width: width * 0.9,
        fontFamily: fontStyle.secondary,
    },
    viewTitulo: {
        width: width * 0.9,
        justifyContent: 'flex-start',
    },
    viewTituloImagem: {
        width: width * 0.9,
        justifyContent: 'center',
    }
});