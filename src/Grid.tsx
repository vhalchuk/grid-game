import { Square } from './types';
import React, { FC } from 'react';

type GridProps = {
    size: number;
    toggledSquares: Square[];
    onToggle: (square: Square) => void;
};

export const Grid: FC<GridProps> = ({ size, toggledSquares, onToggle }) => {
    return (
        <table>
            <tbody>
                {[...Array(size)].map((_, row) => (
                    <tr key={row}>
                        {[...Array(size)].map((_, col) => {
                            const isToggled = toggledSquares.find(
                                (square) =>
                                    square[0] === row && square[1] === col
                            );

                            return (
                                <td
                                    key={col}
                                    style={{
                                        backgroundColor: isToggled
                                            ? 'blue'
                                            : 'white',
                                        width: '20px',
                                        height: '20px',
                                    }}
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
