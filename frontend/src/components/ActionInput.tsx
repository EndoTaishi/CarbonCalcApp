import React, { useState } from 'react';

interface Props {
    onActionSubmit: (action: string) => void; // This might not be used if directly sending to backend
}

export const ActionInput: React.FC<Props> = ({ onActionSubmit }) => {
    const [action, setAction] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/carbonapp/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: action }), // Assuming the backend expects a key "text"
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const result = await response.json();
            onActionSubmit(result); // Assuming you still want to do something with the result in the parent component
            setAction(''); // Reset input after submission
        } catch (error) {
            console.error("There was an error with the fetch operation:", error);
        }
    };

    return (
        <main className="flex-glow flex w-full items-center justify-center">
            <form className="w-1/2" onSubmit={handleSubmit}>
                <textarea 
                    id="action" 
                    className="w-full h-64 p-4 bg-white text-black border border-gray-200 resize-none" 
                    placeholder="今日の出来事を入力してください"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                ></textarea>
                <div className="flex justify-center mt-4">
                    <button type="submit" className="px-4 py-2 rounded bg-[#4C956C] text-white hover:bg-[#3b6b50]">炭素量を計算する</button>
                </div>
            </form>
        </main>
    );
};
