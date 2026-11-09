// Copies the game into www/ and makes it 100% offline:
// downloads the Google Fonts (woff2) and rewrites index.html to use the local copies.
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const www = path.join(root, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(path.join(www, 'fonts'), { recursive: true });

for (const f of fs.readdirSync(root)) {
  if (/\.(html|png|jpg|jpeg|mp3|webp|svg|gif|ico)$/i.test(f)) fs.copyFileSync(path.join(root, f), path.join(www, f));
}

(async () => {
  let html = fs.readFileSync(path.join(www, 'index.html'), 'utf8');
  const linkRe = /<link[^>]+href="(https:\/\/fonts\.googleapis\.com\/[^"]+)"[^>]*>/;
  const m = html.match(linkRe);
  if (!m) { console.log('No Google Fonts link found, skipping fonts.'); return; }
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
  let css = await (await fetch(m[1].replace(/&amp;/g, '&'), { headers: { 'User-Agent': UA } })).text();
  const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(x => x[1]))];
  if (!urls.length) throw new Error('No font files found in Google Fonts CSS');
  let i = 0;
  for (const u of urls) {
    const name = `f${++i}.woff2`;
    const res = await fetch(u);
    if (!res.ok) throw new Error('Font download failed: ' + u);
    fs.writeFileSync(path.join(www, 'fonts', name), Buffer.from(await res.arrayBuffer()));
    css = css.split(u).join(name);
  }
  fs.writeFileSync(path.join(www, 'fonts', 'fonts.css'), css);
  html = html.replace(linkRe, '<link href="fonts/fonts.css" rel="stylesheet">');
  fs.writeFileSync(path.join(www, 'index.html'), html);
  if (/https?:\/\/(fonts|cdn|unpkg)/.test(html.replace(/<!--[\s\S]*?-->/g, ''))) console.warn('WARNING: external reference still present in index.html');
  console.log(`Fonts localised: ${urls.length} files. www/ is ready for offline use.`);
})().catch(e => { console.error(e); process.exit(1); });
