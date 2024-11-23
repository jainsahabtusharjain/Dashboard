const sass = require('sass');
const fs = require('fs');

// Compile the SCSS file
const result = sass.compile('src/styles/app.scss');

// Write the compiled CSS to a file
fs.writeFileSync('dist/styles/app.css', result.css);
