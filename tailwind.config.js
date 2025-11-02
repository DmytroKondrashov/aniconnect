/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			// Add custom colors/spacing if needed
			colors: {
				primary: '#3273dc', // Bulma primary color
				info: '#3298dc',
				success: '#48c774',
				warning: '#ffdd57',
				danger: '#f14668'
			}
		}
	},
	plugins: [
		// Add typography plugin if you use rich text
		require('@tailwindcss/typography')
	]
};
