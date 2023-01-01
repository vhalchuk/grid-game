import React, { FC } from 'react';

import { SquarePos } from '../../types';

type ToggledListProps = {
    toggledSquares: SquarePos[];
};

export const ToggledList: FC<ToggledListProps> = ({ toggledSquares }) => {
    return (
        <ul className="flex flex-col gap-2">
            {toggledSquares.map(([row, col]) => {
                const key = `row ${row} col ${col}`;

                return (
                    <li
                        key={key}
                        className="bg-amber-50 p-2 rounded border border-amber-300 font-bold text-amber-800"
                    >
                        {key}
                    </li>
                );
            })}
        </ul>
    );
};
