import { combineReducers } from 'redux';
import ChatMessage from './chatMessage';
import Content from './content';

export default combineReducers({
    ChatMessage: ChatMessage,
    Content: Content
});