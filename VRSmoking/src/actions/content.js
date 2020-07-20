export const listarConteudoPorAtividade = (atividade_id) => { // Exportando dessa forma é possível exportar mais de uma action create
    return {
        type: 'listar-conteudo-saga',
        payload: {
            atividade_id
        } 
    }
};