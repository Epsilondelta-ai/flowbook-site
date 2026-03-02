import { readFileSync, writeFileSync } from 'fs';

const file = 'public/preview/index.html';
let html = readFileSync(file, 'utf8');

// Fix asset paths from absolute to relative for iframe embedding
html = html.replace(/src="\/assets\//g, 'src="./assets/');
html = html.replace(/href="\/assets\//g, 'href="./assets/');

writeFileSync(file, html);
