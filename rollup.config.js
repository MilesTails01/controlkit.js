// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'lib/ControlKit.js', // Adjust this path to the ControlKit main file
	output: {
		file: 'dist/controlkit.esm.js', // Output file in the dist directory
		format: 'es', // Output format as ES module
		name: 'ControlKit'
	},
	plugins: [
		resolve({
			browser: true,
		}),
		commonjs(),
	//	terser() // Minify the bundle (optional)
	]
};
