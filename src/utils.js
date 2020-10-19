const getClassName = (event) => {
	return event.currentTarget.className.split(' ')[1];
};

export { getClassName };
