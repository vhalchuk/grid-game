import { Square } from './types';
import React, { FC } from 'react';

type ToggledListProps = {
    toggledSquares: Square[];
};

export const ToggledList: FC<ToggledListProps> = ({ toggledSquares }) => {
    return (
        <ul>
            {toggledSquares.map(([row, col]) => {
                const key = `row ${row} col ${col}`;

                return <li key={key}>{key}</li>;
            })}
        </ul>
    );
};
