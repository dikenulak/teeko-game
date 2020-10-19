import React from 'react';
import { withCopiedData } from './withCopiedData';

const Board = ({ data, winnerDeclared, onDragDrop, onDragStart, getCircleData }) => {
	const allowDrop = (ev) => {
		ev.preventDefault();
	};
	return (
		<div className="border-board">
			<div className="board">
				{data.map((insideArrayData, rowIndex) => (
					<div key={`insideArrayData-${rowIndex}`} className="flex flex-row">
						{insideArrayData.map((arrayData, columnIndex) => (
							<div
								onDragStart={(e) =>
									!winnerDeclared && withCopiedData({ e, rowIndex, columnIndex, data })(onDragStart)}
								onDragOver={(e) => !winnerDeclared && allowDrop(e)}
								onDrop={(e) =>
									!winnerDeclared && withCopiedData({ e, rowIndex, columnIndex, data })(onDragDrop)}
								draggable
								className={`circle ${insideArrayData[columnIndex]}`}
								key={`${columnIndex}-${rowIndex}`}
								onClick={() => withCopiedData({ rowIndex, columnIndex, data })(getCircleData)}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Board;
