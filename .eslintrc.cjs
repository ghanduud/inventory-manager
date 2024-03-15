module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'@electron-toolkit',
	],
	rules: {
		'react/prop-types': 'off', // Disable prop-types validation
	},
};
