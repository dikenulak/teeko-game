import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import { checkWinner } from './checkWinner';
import { numOfColumns, numOfRows, cellData, PLAYER_2, PLAYER_1, nameOfPlayer } from './constants';
import Header from './Header';

const generateData = () => {
	return Array(numOfRows).fill([]).map((d) => Array(numOfColumns).fill(cellData));
};

function App() {
	const [ player, setPlayer ] = useState(true);
	const [ data, setData ] = useState(generateData());
	const [ stepNumber, setStepNumber ] = useState(0);
	const [ info, setInfo ] = useState('');
	const [ winnerDeclared, setWinnerDeclared ] = useState(false);
	const [ startDrag, setStartDrag ] = useState('');

	const getCircleData = ({ copiedData, rowColData, rowIndex, columnIndex }) => {
		if (stepNumber < 8 && rowColData === 0) {
			const players = !player;
			copiedData[rowIndex][columnIndex] = players ? PLAYER_2 : PLAYER_1;
			setPlayer(players);
			setData(copiedData);
			setStepNumber(stepNumber + 1);
		}

		if (stepNumber > 7 && rowColData === 0) {
			setInfo(`Please start dragging with ${nameOfPlayer[PLAYER_1]}`);
		}
	};

	const onDragStart = ({ copiedData, rowColData, currentTargetValue, rowIndex, columnIndex }) => {
		setInfo('');
		setStartDrag(rowColData);
		if (
			currentTargetValue !== '0' &&
			stepNumber > 7 &&
			((player && rowColData === PLAYER_1) || (!player && rowColData === PLAYER_2))
		) {
			copiedData[rowIndex][columnIndex] = 0;
			setData(copiedData);
		}
	};

	const onDragDrop = ({ copiedData, currentTargetValue, rowIndex, columnIndex }) => {
		if ((player && startDrag !== PLAYER_1) || (!player && startDrag !== PLAYER_2)) {
			setInfo('Please select corresponding dice');
			return null;
		}

		if (startDrag && startDrag.split('-')[0] === currentTargetValue.split('-')[0]) {
			setInfo('Cannot drag to occupied space');
			setWinnerDeclared(true);
			return null;
		}

		if (
			!isNaN(parseInt(currentTargetValue)) &&
			stepNumber > 7 &&
			startDrag.toString() !== currentTargetValue &&
			currentTargetValue !== copiedData[rowIndex][columnIndex]
		) {
			const checkPlayer = !player ? PLAYER_2 : PLAYER_1;
			copiedData[rowIndex][columnIndex] = checkPlayer;

			if (checkWinner(copiedData, checkPlayer)) {
				setInfo(`Winner is ${nameOfPlayer[checkPlayer]}`);
				setWinnerDeclared(!winnerDeclared);
			}
			setPlayer(!player);
			setData(copiedData);
		}
	};

	const onRestart = () => {
		setData(generateData());
		setStepNumber(0);
		setPlayer(true);
		setWinnerDeclared(false);
		setInfo('');
	};

	return (
		<div className="App">
			<div className="App-header">
				<h1>Teeko Game</h1>
				<Header winnerDeclared={winnerDeclared} player={player} info={info} onRestart={onRestart} />
				<Board
					winnerDeclared={winnerDeclared}
					onDragDrop={onDragDrop}
					onDragStart={onDragStart}
					getCircleData={getCircleData}
					data={data}
				/>
			</div>
		</div>
	);
}

export default App;
