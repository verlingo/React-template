import React from 'react';
import Arbeitszeugnis from './components/Arbeitszeugnis'
import {data} from './templateData' 
function App() {
  
  return (
    <Arbeitszeugnis daten={data.Zeugnisanalysen[0]} ></Arbeitszeugnis>
  );
}

export default App;
