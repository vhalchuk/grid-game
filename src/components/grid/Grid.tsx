import classNames from 'classnames';
import React, { FC } from 'react';

import { SquarePos } from '../../types';

type GridProps = {
    size: number;
    toggledSquares: SquarePos[];
    onToggle: (square: SquarePos) => void;
    gridClassName?: string;
};

export const Grid: FC<GridProps> = ({
    size,
    toggledSquares,
    onToggle,
    gridClassName,
}) => {
    return (
        <table className={classNames('h-fit', gridClassName)}>
            <tbody>
                {[...Array(size)].map((_, row) => (
                    <tr key={row}>
                        {[...Array(size)].map((_, col) => {
                            const isToggled = toggledSquares.find(
                                (square) =>
                                    square[0] === row && square[1] === col
                            );

                            const className = classNames(
                                'border border-gray-600 min-w-[2rem] w-8 h-8 bg-white',
                                {
                                    'bg-blue-300': isToggled,
                                }
                            );

                            return (
                                <td
                                    key={col}
                                    className={className}
                                    onMouseEnter={() => onToggle([row, col])}
                                />
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
