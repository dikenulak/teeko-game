import { getClassName } from "./utils";

const withCopiedData = ({ e, rowIndex, columnIndex, data }) => {
	const copiedData = [ ...data ];
	let rowColData = copiedData[rowIndex][columnIndex];
	const currentTargetValue = e && getClassName(e);

	return (func) => {
		func({ copiedData, rowColData, currentTargetValue, rowIndex, columnIndex });
	};
};

export { withCopiedData };
