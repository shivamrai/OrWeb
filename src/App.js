import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hightlight from './components/highlighttTooltip';
import TextEditor from './components/textEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TextEditor />
      </header>
    </div>
  );
}

export default App;
