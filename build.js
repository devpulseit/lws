const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname, 'build');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), '<html><body><h1>Hello from lws</h1></body></html>\n');

