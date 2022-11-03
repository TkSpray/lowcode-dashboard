import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './modules';
import Editor from './modules/Editor';
import StateProvider from './store';

import './assets/theme/dark';
import 'antd/dist/antd.dark.min.css';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/edit' element={<Editor />} />
        </Routes>
      </StateProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
