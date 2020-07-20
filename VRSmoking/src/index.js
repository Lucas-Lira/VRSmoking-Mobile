import React from 'react';
import Routes from './routes';
import { YellowBox } from 'react-native';

// Adicionado o provider do Redux, com essa configuração é possível permitir que todas as funcionalidades do aplicativo tenha acesso aos estados
import { Provider } from 'react-redux';
// Importando o store da aplicação
import Store from './store/';


YellowBox.ignoreWarnings([
    "Warning: Can't perform a React state update on an unmounted component.",
    "Warning: componentWillUpdate has been renamed, and is not recommended for use",
    "Warning: componentWillReceiveProps has been renamed, and is not recommended for use",
    "Require cycle: node_modules\\rn-fetch-blob\\index.js -> node_modules\\rn-fetch-blob\\polyfill\\index.js -> node_modules\\rn-fetch-blob\\polyfill\\XMLHttpRequest.js -> node_modules\\rn-fetch-blob\\index.js",
    "Warning: componentWillMount has been renamed, and is not recommended for use.",
    "Picker has been extracted from react-native core and will be removed in a future release."
]);

const Index = () => (
    <Provider store={Store}>
        <Routes />
    </Provider>
);

export default Index;