/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				amber: colors.amber,
				cyan: colors.cyan,
				slate: colors.slate
			}
		},
		fontFamily: {
			body: [
				'Comfortaa',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			]
		},
		colors: {
			brown: {
				50: '#f7f5f3',
				100: '#e7e0da',
				200: '#d6ccc2',
				300: '#c6b8a9',
				400: '#b6a391',
				500: '#a58f78',
				600: '#937a62',
				700: '#7a6652',
				800: '#625241',
				900: '#493D31'
			}
		}
	},
	plugins: []
};
