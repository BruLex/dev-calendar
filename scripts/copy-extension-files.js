const fs = require('fs');
const path = require('path')
const filesToCopy = [
    'calendar.png',
    'manifest.json'
];
filesToCopy.forEach(v =>
    fs.copyFileSync(path.resolve('extension/' + v), path.resolve('dist/dev-calendar/' + v))
);
