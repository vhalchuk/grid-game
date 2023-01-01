import './App.css';
import { Grid } from './Grid';
import { Select } from './Select';
import { ToggledList } from './ToggledList';
import { Square } from './types';
import { useModesQuery } from './useModesQuery';
import React, { FC, useState } from 'react';

export const App: FC = () => {
    const [selectedMode, setSelectedMode] = useState<string | undefined>();
    const [toggledSquares, setToggledSquares] = useState<Square[]>([]);
    const [gamePending, setGamePending] = useState<boolean>(false);

    const { modes, isLoading, error } = useModesQuery();

    const selectOptions = modes.map((item) => ({
        value: item.name,
        label: item.name,
    }));
    const gridSize = modes.find((item) => item.name === selectedMode)?.field;

    const toggleSquare = ([row, col]: Square) => {
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
        <main>
            <h1>{isLoading ? 'Loading...' : 'Grid game'}</h1>
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
            >
                {gamePending ? 'Stop' : 'Start'}
            </button>
            {error && <p>{error}</p>}
            {gamePending && (
                <Grid
                    size={gridSize!}
                    toggledSquares={toggledSquares}
                    onToggle={toggleSquare}
                />
            )}
            <ToggledList toggledSquares={toggledSquares} />
        </main>
    );
};
