import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from './context/context';
import {SpeechProvider} from '@speechly/react-client';
import {AuthProvider} from './context/AuthProvider';



ReactDOM.render(
       
  <SpeechProvider appId='7e24c4b9-3c57-4489-b99e-571654d1c55a' language='en-US'>
        <AuthProvider>
       <Provider>
          <App /> 
          </Provider>
          </AuthProvider>
       </SpeechProvider>
     
  ,
      
         document.getElementById('root'));