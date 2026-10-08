// src/template.html と src/questions.js から index.html を生成する
// 使い方: node build.js
const fs = require('fs');
const q = fs.readFileSync('src/questions.js', 'utf8');
const n = (q.match(/^\{f:/gm) || []).length;
const video = fs.existsSync('assets/opening.mp4')
  ? '<video src="assets/opening.mp4" autoplay muted loop playsinline preload="auto"></video>' : '';
const html = fs.readFileSync('src/template.html', 'utf8')
  .replace('__QUESTIONS__', q).replace('__VIDEO__', video).replaceAll('__TOTAL__', n);
fs.writeFileSync('index.html', '<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + html.replace('<canvas id="sky"', '</head>\n<body>\n<canvas id="sky"') + '\n</body>\n</html>\n');
console.log(`index.html: ${n}問 / 映像 ${video ? 'あり' : 'なし'}`);
