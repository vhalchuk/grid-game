import { Grid } from '../grid/Grid';
import { Select } from '../select/Select';
import { ToggledList } from '../toggled-list/ToggledList';
import './App.css';
import { useApp } from './useApp';
import React, { FC } from 'react';

export const App: FC = () => {
    const {
        heading,
        selectOptions,
        selectedMode,
        setSelectedMode,
        isSelectDisabled,
        gamePending,
        gridSize,
        error,
        onButtonClick,
        buttonLabel,
        toggleSquare,
        toggledSquares,
    } = useApp();

    return (
        <main className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl">{heading}</h1>
            <div className="flex space-x-6 justify-center">
                <Select
                    placeholder="Pick mode"
                    options={selectOptions}
                    selected={selectedMode}
                    onSelect={setSelectedMode}
                    disabled={isSelectDisabled}
                />
                <button
                    disabled={!gridSize}
                    onClick={onButtonClick}
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
                    {buttonLabel}
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
