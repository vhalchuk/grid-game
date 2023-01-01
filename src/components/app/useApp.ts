import { SquarePos } from '../../types';
import { useModesQuery } from './useModesQuery';
import { useState } from 'react';

// separates the logic from the component
export const useApp = () => {
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

    return {
        heading: isLoading ? 'Loading...' : 'Grid game',
        selectOptions,
        selectedMode,
        setSelectedMode,
        isSelectDisabled: isLoading || gamePending,
        gamePending,
        gridSize,
        error,
        onButtonClick: gamePending ? stopGame : startGame,
        buttonLabel: gamePending ? 'Stop' : 'Start',
        toggleSquare,
        toggledSquares,
    };
};
