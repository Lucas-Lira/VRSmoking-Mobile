// import client_io from 'socket.io-client';
// import Moment from 'moment';

import serviceConfig from '../services/config';
const { URL } = serviceConfig;

// Definindo o estado inicial da aplicação
const INITIAL_STATE = {
    io: null,
    carrega_mensagens: false
};

export default (state = INITIAL_STATE, action) => {

    //console.log('My Action: ', action);

    //if (action.type === `carrega-mensagens`) {

        // return {
        //     ...state, // Utilizando o spread (No redux a ídeia não é modificar o estado mais sim evoluí-lo)
        //     carrega_mensagens: true
        // };

        // try {

        //     let usr_id = action.usuario_origem;
        //     let grp_id = action.grupo_usuario_origem;
            
        //     const io = client_io(URL.VRSMOKING_CHAT);
      
        //     // Criando a conexão do socket com o servidor
        //     io.on('connect', () => {
      
        //       io.emit('connectionParams', { usr_id, grp_id, screen: "mensagens" });
      
        //       io.on('receivingMessageScreenData', (data) => {
      
        //           if (!data._mensagem) {
     
        //             let result = data._result;
        //             let vet_mensagens = [];
        //             let list_mensagens_update = [];
        //             let tipoUsuario = 0;
        //             let data_entrega = null;
                    
        //             for (let i = 0; i < result.length; i++) {
  
        //               // Alterar o estado da mensagem, caso o destino for este usuário
  
        //               if (result[i]._usuario_origem._id === parseInt(usr_id))
        //                 tipoUsuario = 1;
        //               else {
  
        //                 tipoUsuario = 2;
  
        //                 if (result[i]._entregue === 'N' && ((result[i]._usuario_destino && parseInt(result[i]._usuario_destino._id) === parseInt(usr_id)) || (result[i]._grupo_destino && parseInt(result[i]._grupo_destino._id) === parseInt(grp_id)))) // Não foi entregue nem visualizado
        //                 {
  
        //                   list_mensagens_update.push({
        //                     _id: result[i]._id,
        //                     _data_entrega: Moment().format('YYYY-MM-DD hh:mm:ss'),
        //                     _entregue: 'S',
        //                     _visualizado: 'S'
        //                   });
  
        //                   data_entrega = Moment().format('YYYY-MM-DD hh:mm:ss');
  
        //                 } else { // Foi entregue
  
        //                   if (result[i]._visualizado === 'N' && ((result[i]._usuario_destino && parseInt(result[i]._usuario_destino._id) === parseInt(usr_id)) || (result[i]._grupo_destino && parseInt(result[i]._grupo_destino._id) === parseInt(grp_id)))) { // Não foi visualizado
  
        //                     list_mensagens_update.push({
        //                       _id: result[i]._id,
        //                       _data_entrega: result[i]._data_entrega,
        //                       _entregue: result[i]._entregue,
        //                       _visualizado: 'S'
        //                     });
  
        //                   }
  
        //                   data_entrega = result[i]._data_entrega;
  
        //                 }
  
        //               }
  
        //               vet_mensagens.push({
        //                 id: result[i]._id,
        //                 mensagem: result[i]._mensagem,
        //                 data_envio: result[i]._data_envio,
        //                 data_entrega,
        //                 entregue: `S`,
        //                 visualizado: `S`,
        //                 tipoUsuario 
        //               });
  
        //             }
  
        //             return {
        //                 ...state, // Utilizando o spread (No redux a ídeia não é modificar o estado mais sim evoluí-lo)
        //                 io: io,
        //                 messages: vet_mensagens
        //             };
  
        //             // FAzer requisição para alteração dos dados
        //             io.emit('atualizarListadeMensagens', list_mensagens_update);
      
        //           } else
        //               console.log(data._mensagem);
      
        //       });
      
        //       // Enviando dados para a busca das mensagens
        //       io.emit('connectionParamsMessages', { origem: usr_id, destino: action.cod_desnito, tipoDestino: action.tipo_destino });
      
        //     });
      
        //   } catch (e) {
        //     console.log('Falha na conexão com o socket (Arquivo: reducers/chatMessage)');
        //   }

    //}

    return state;

}