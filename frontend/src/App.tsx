import React, { useState } from 'react';
import Summarize from './components/Summarize';

import Header from "./components/Header"
import Footer from './components/Footer';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false); // 結果を表示するかどうかの状態

  const handleActionSubmit = (action: string) => {
    // ここでAPIを呼び出し、結果を取得したと仮定
    setResult(`${action}`);
    setShowResult(true); // 結果を表示する
  };

  return (
    <div className='flex flex-col w-full justify-between h-screen'>
        <Header />
        <div>
            <Summarize />
        </div>
        <Footer />
    </div>
  );
}

export default App;
