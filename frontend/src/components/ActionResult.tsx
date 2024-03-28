import React from 'react';

interface Props {
    result: string; // 結果表示用のデータ。実際にはもっと複雑なデータ構造になる可能性がある
};

export const ActionResult = ({ result }: Props) => {
    return (
        <main className="flex-glow flex w-full items-center justify-center">
            <div className="relative text-center w-1/2">
                <div className="text-[100px] opacity-60">🌏</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-roboto">
                    あなたの炭素排出量は{result}です。
                </div>
            </div>
        </main>
    );
};