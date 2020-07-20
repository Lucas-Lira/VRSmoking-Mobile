const INITIAL_STATE = {
    contents: []
}

export default (state = INITIAL_STATE, action) => {

    if (action.type === `listar-conteudo`) {
        return {
            ...state, // Utilizando o spread (No redux a ídeia não é modificar o estado mais sim evoluí-lo)
            contents: action.payload.contents
        };
    }

    return state;

};