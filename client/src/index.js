import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from './context/context';
import {SpeechProvider} from '@speechly/react-client';

ReactDOM.render(
        <SpeechProvider appId='7e24c4b9-3c57-4489-b99e-571654d1c55a' language='en-US'>
        <Provider> <App /> </Provider>
        </SpeechProvider>,
         document.getElementById('root'));