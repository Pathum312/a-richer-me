export const assignColor = () => {
	const colors = [
		'e6cff2',
		'bb49f6',
		'd4edbc',
		'5c9723',
		'ff9393',
		'b10202',
		'bfe1f6',
		'0e6ba4',
		'ffcfc9',
		'f94f3a',
		'c6dbe1',
		'258ca9',
		'72dbfd',
		'215a6c',
		'ffc8aa',
		'ec6319',
	];

	return colors[Math.floor(Math.random() * colors.length)];
};
