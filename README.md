# Conway's Game of Life

This repo contains source files for a simple website to simulate [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Live Demo

Check out the [live version] (https://game-of-life-sreshth-tiwari.vercel.app/).

## About

Conway's Game of Life is a zero-player game where the state of the board evolves over time based on an initial configuration. Each cell in the grid lives or dies based on a simple set of rules.

### Rules

1. Survival: A live cell with 2 or 3 live neighbors stays alive.
2. Death by Isolation: A live cell with fewer than 2 live neighbors dies.
3. Death by Overpopulation: A live cell with more than 3 live neighbors dies.
4. Reproduction: A dead cell with exactly 3 live neighbors becomes alive.

## Tech Stack

React, HTML, CSS

## To Do

- [ ] Optimize simulation
- [ ] Add different colors to cell, so that they form a gradient
- [ ] Add range slider to allow user to change speed of simulation
- [ ] Add preset patterns (Glider Gun, etc.)
- [ ] Host project
