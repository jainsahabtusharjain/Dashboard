import * as sass from 'sass';
import { writeFileSync, mkdirSync } from 'fs';

// Ensure the output directory exists
mkdirSync('dist/styles', { recursive: true });

// Compile the SCSS file
const result = sass.compile('src/styles/app.scss');

// Write the compiled CSS to a file
writeFileSync('dist/styles/app.css', result.css);
