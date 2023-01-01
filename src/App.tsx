import './App.css';
import { Grid } from './Grid';
import { Select } from './Select';
import { ToggledList } from './ToggledList';
import { SquarePos } from './types';
import { useModesQuery } from './useModesQuery';
import React, { FC, useState } from 'react';

export const App: FC = () => {
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [toggledSquares, setToggledSquares] = useState<SquarePos[]>([]);
    const [gamePending, setGamePending] = useState<boolean>(false);

    const { modes, isLoading, error } = useModesQuery();

    const selectOptions = modes.map((item) => ({
        value: item.name,
        label: item.name,
    }));
    const gridSize = modes.find((item) => item.name === selectedMode)?.field;

    const toggleSquare = ([row, col]: SquarePos) => {
        const index = toggledSquares.findIndex(
            (square) => square[0] === row && square[1] === col
        );

        if (index === -1) {
            setToggledSquares([...toggledSquares, [row, col]]);
        } else {
            const updatedSquares = [...toggledSquares];
            updatedSquares.splice(index, 1);
            setToggledSquares(updatedSquares);
        }
    };

    const startGame = () => {
        setGamePending(true);
    };

    const stopGame = () => {
        setGamePending(false);
        setToggledSquares([]);
    };

    return (
        <main className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">
                {isLoading ? 'Loading...' : 'Grid game'}
            </h1>
            <div className="flex space-x-6 justify-center">
                <Select
                    placeholder="Pick mode"
                    options={selectOptions}
                    selected={selectedMode}
                    onSelect={setSelectedMode}
                    disabled={isLoading || gamePending}
                />
                <button
                    disabled={!gridSize}
                    onClick={gamePending ? stopGame : startGame}
                    className={`
                        bg-blue-500
                        hover:bg-blue-700
                        text-white
                        font-bold
                        py-2 px-4
                        rounded
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:bg-blue-500
                    `}
                >
                    {gamePending ? 'Stop' : 'Start'}
                </button>
            </div>
            {error && (
                <div className="bg-red-50 px-1 py-2 rounded border border-red-300 font-bold text-red-700">
                    {error}
                </div>
            )}
            {gamePending && (
                <div className="flex gap-8">
                    <Grid
                        size={gridSize!}
                        toggledSquares={toggledSquares}
                        onToggle={toggleSquare}
                        gridClassName="shrink-0"
                    />
                    <div className="flex flex-col gap-2 shrink-0">
                        <h2 className="font-bold text-2xl">Hover squares</h2>
                        <ToggledList toggledSquares={toggledSquares} />
                    </div>
                </div>
            )}
        </main>
    );
};
