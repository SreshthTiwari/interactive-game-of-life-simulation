// GameOfLife.js

import React, {
    useState,
    useCallback,
    useRef
} from 'react';
import produce from 'immer';
import "./App.css"

const numRows = 18;
const numCols = 35;
const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
];

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
};

const GameOfLife = () => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid((g) => {
            return produce(g, (gridCopy) => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (
                                newI >= 0 &&
                                newI < numRows &&
                                newJ >= 0 &&
                                newJ < numCols
                            ) {
                                neighbors += g[newI][newJ];
                            }
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            });
        });

        setTimeout(runSimulation, 50);
    }, []);

    return (
        <>
        <div className='container'>
            <div className='grid'
                style={{
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}>
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <div className='cell'
                            key={`${i}-${j}`}
                            onClick={() => {
                                const newGrid = produce(grid,(gridCopy) => {
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor:
                                    grid[i][j] ?
                                        'white' :
                                        undefined,
                                border: 'solid 1px gray',
                            }} />
                    ))
                )}
            </div>
            <div className='controls'>
                <div className='text'>
                    <h1 className='heading'>Conway's Game of Life</h1>
                    <h3 className='author'>By Sreshth Tiwari</h3>
                </div>
                <div className='buttons'>
                    <button 
                        onClick={() => {
                            setRunning(!running);
                            if (!running) {
                                runningRef.current = true;
                                runSimulation();
                            }
                        }}
                    >
                        {running ? 'Stop' : 'Start'}
                    </button>
                    <button 
                        onClick={() => {
                            const rows = [];
                            for (let i = 0; i < numRows; i++) {
                                rows.push(
                                    Array.from(Array(numCols),
                                        () => (Math.random() > 0.7 ? 1 : 0))
                                );
                            }
                            setGrid(rows);
                        }}>
                        Randomize
                    </button>
                    <button 
                        onClick={() => {
                            setGrid(generateEmptyGrid());
                        }}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default GameOfLife;
