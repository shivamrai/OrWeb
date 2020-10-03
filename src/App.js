import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hightlight from './components/highlighttTooltip';
import TextEditor from './components/textEditor';
import Risks from './components/Risks';
import Introduction from './components/Introduction';
import MainAppBar  from './components/MainAppBar';

function App() {
  return (
    <div className="App">
      <MainAppBar />
      <header className="App-header">
       
        <TextEditor />
      </header>
    </div>
  );
}

export default App;
