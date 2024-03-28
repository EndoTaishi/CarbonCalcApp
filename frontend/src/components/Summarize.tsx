// SummaryComponent.tsx
import React, { useState } from 'react';

const Summarize = () => {
    const [text, setText] = useState(''); // ユーザー入力を保持するステート
    const [summary, setSummary] = useState(''); // 要約結果を保持するステート

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // フォームのデフォルトの送信動作を防止
        try {
            const response = await fetch('http://127.0.0.1:8000/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text }), // ユーザー入力をJSON形式で送信
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSummary(data.summary); // レスポンスから要約結果をステートにセット
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <main className="flex-glow flex w-full items-center justify-center">
            {!summary ? (
                <form className="w-1/2" onSubmit={handleSubmit}>
                    <textarea 
                        className="w-full h-64 p-4 bg-white text-black border border-gray-200 resize-none" 
                        placeholder="今日の出来事を入力してください"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="px-4 py-2 rounded bg-[#4C956C] text-white hover:bg-[#3b6b50]">炭素量を計算する</button>
                    </div>
                </form>
            ) : (
                <div className="w-full">
                    <div className="relative text-center w-full">
                        <div className="text-[100px] opacity-60">🌏</div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-roboto">
                            {summary}
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <a href="/" className="px-4 py-2 rounded bg-[#4C956C] text-white hover:bg-[#3b6b50]">ホームに戻る</a>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Summarize;
