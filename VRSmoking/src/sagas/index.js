import { takeEvery, put, call } from 'redux-saga/effects';

import api from '../services/api';

function* listarConteudosPorID(action) {

    try {

        const response = yield call(api.get, `/atividade/ObterCompletoPorId/${action.payload.atividade_id}`);
        let contents = [];

        //console.log('Response SAGA: ', response.data);

        if (response.data && !response.data._mensagem && response.data._erros.length === 0) {
            
            let result = response.data._result;

            if (result.length > 0)
                contents = result[0]._itens_atividade;

           /// console.log('Contents SAGA: ', contents);

            //console.log('Percurso: ', contents)

            yield put({ type: 'listar-conteudo', payload: { contents: contents } });

        }

        

    } catch (e) {
        yield put({ type: 'listar-conteudo', payload: { contents: [] } });
    }

}


// Função utilizando o conceito de generator do redux saga
export default function* root() {
    yield takeEvery('listar-conteudo-saga', listarConteudosPorID)
}