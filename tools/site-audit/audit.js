// Node 18+. No deps. Walks repo, inspects source, checks links, and writes reports.
import fs from 'fs';
import path from 'path';
const repoRoot = process.cwd();
const outDir = path.join(repoRoot, 'reports');
const ts = new Date().toISOString().replaceAll(':','-').replaceAll('.','-');
const baseName = `legacycapny-audit-${ts}`;
const mdPath = path.join(outDir, `${baseName}.md`);
const jsonPath = path.join(outDir, `${baseName}.json`);

// ---- helpers ----
const extsCode = new Set(['.js','.jsx','.ts','.tsx','.md','.html','.css']);
const extsTemplates = new Set(['.html','.tsx','.jsx']);
const isBinary = (p) => /\.(png|jpg|jpeg|webp|gif|svg|ico|pdf|mp4|mov|zip)$/i.test(p);
const read = (p) => fs.readFileSync(p,'utf8');
const sizeKB = (p) => Math.round(fs.statSync(p).size/1024);
const walk = (dir) => {
  const out=[]; for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    if (e.name === 'node_modules' || e.name.startsWith('.git')) continue;
    const p = path.join(dir,e.name);
    if (e.isDirectory()) out.push(...walk(p)); else out.push(p);
  } return out;
};

// ---- collect files ----
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true});
const files = walk(repoRoot);

// ---- checks ----
const report = {
  meta: { project: 'legacycapny.com', generatedAt: new Date().toISOString() },
  totals: { files: files.length },
  errors: [], warnings: [], passes: [],
  findings: {
    brokenLinks: [],
    emptyOrPlaceholderPages: [],
    accessibility: [],
    seo: [],
    performance: [],
    security: [],
    ux: [],
    codeHygiene: [],
    brandConsistency: []
  }
};

// Find links and basic issues
const linkRegex = /(?:href|src)\s*=\s*["'`](.*?)["'`]/gi;
const imgRegex = /<img\b[^>]*>/gi;
const altRegex = /alt\s*=\s*["'`](.*?)["'`]/i;
const titleRegex = /<title>(.*?)<\/title>/i;
const metaDescRegex = /<meta\s+name=["']description["']\s+content=["'](.*?)["']\s*\/?>/i;
const ogRegex = /<meta\s+property=["']og:/i;

// Performance: large public assets
for (const p of files.filter(f=>isBinary(f))) {
  const kb = sizeKB(p);
  if (kb > 512) {
    report.findings.performance.push({ type:'LargeAsset', file: rel(p), sizeKB: kb, note: '>512KB asset' });
  }
}

// Inspect code/text files
function rel(p){ return path.relative(repoRoot,p); }
const internalLinks = new Set();
const externalLinks = new Set();

for (const p of files.filter(f=>extsCode.has(path.extname(f)))) {
  const content = read(p);

  // Empty or placeholder pages/components
  if (content.length < 200 || /TODO|TBD|coming soon|lorem ipsum|placeholder/i.test(content)) {
    if (/\b(page|route|index|[A-Z][a-zA-Z]*Page)\b/.test(p)) {
      report.findings.emptyOrPlaceholderPages.push({ file: rel(p), reason: 'Very small or placeholder content' });
    }
  }

  // Code hygiene
  if (/console\.log|debugger;/.test(content)) {
    report.findings.codeHygiene.push({ file: rel(p), issue: 'Debug statements present' });
  }
  if (/eslint-disable(-next-line)?/i.test(content)) {
    report.findings.codeHygiene.push({ file: rel(p), issue: 'ESLint disabled inline' });
  }

  // Security
  if (/API_KEY|SECRET|PRIVATE_KEY|SUPABASE_KEY|STRIPE_(LIVE|SECRET)/i.test(content)) {
    report.findings.security.push({ file: rel(p), issue: 'Possible secret in source' });
  }

  // Extract links
  for (const m of content.matchAll(linkRegex)) {
    const url = m[1].trim();
    if (!url || url.startsWith('data:') || url.startsWith('mailto:') || url.startsWith('tel:')) continue;
    if (url.startsWith('http')) externalLinks.add(url);
    else if (!url.startsWith('#')) internalLinks.add(url);
  }

  // Accessibility + SEO in templates
  if (extsTemplates.has(path.extname(p))) {
    // <img> without alt or empty alt
    for (const tag of content.matchAll(imgRegex)) {
      const t = tag[0];
      const altMatch = t.match(altRegex);
      if (!altMatch || altMatch[1].trim()==='') {
        report.findings.accessibility.push({ file: rel(p), issue: '<img> missing or empty alt' });
      }
    }
    // Heading order sanity check
    if ((/h1/gi.test(content) && (content.match(/<h1/gi)||[]).length>1)) {
      report.findings.accessibility.push({ file: rel(p), issue: 'Multiple <h1> tags' });
    }
    // SEO basics
    if (!titleRegex.test(content)) report.findings.seo.push({ file: rel(p), issue: 'Missing <title>' });
    if (!metaDescRegex.test(content)) report.findings.seo.push({ file: rel(p), issue: 'Missing meta description' });
    if (!ogRegex.test(content)) report.findings.seo.push({ file: rel(p), issue: 'No Open Graph tags' });
    // UX: href="#" traps
    if (/href\s*=\s*["']#["']/.test(content)) {
      report.findings.ux.push({ file: rel(p), issue: 'Anchor with href="#"' });
    }
    // Brand consistency quick check
    if (/font-family\s*:\s*/i.test(content) && /inline/i.test(rel(p))) {
      report.findings.brandConsistency.push({ file: rel(p), issue: 'Inline font-family; prefer tokens/theme' });
    }
  }
}

// Check internal links exist in project or likely route
function probableExists(u){
  // try matching a file in /public or route-like in /pages|/app|/src/pages
  const publicPath = path.join(repoRoot,'public',u);
  if (fs.existsSync(publicPath)) return true;
  const routePaths = [
    path.join(repoRoot,'pages',u),
    path.join(repoRoot,'src','pages',u),
    path.join(repoRoot,'app',u)
  ];
  return routePaths.some(p=>{
    if (fs.existsSync(p)) return true;
    const withIndex = path.join(p,'index.tsx');
    const withPage = path.join(p,'page.tsx');
    return fs.existsSync(withIndex) || fs.existsSync(withPage);
  });
}

for (const url of internalLinks) {
  if (!probableExists(url)) {
    report.findings.brokenLinks.push({ url, scope:'internal', note:'Target not found in repo (heuristic)' });
  }
}

// Validate external links with HEAD then GET
async function checkExternal(){
  const results=[];
  for (const url of externalLinks) {
    try {
      const head = await fetch(url, { method:'HEAD' });
      if (!head.ok) {
        const get = await fetch(url, { method:'GET' });
        if (!get.ok) results.push({ url, status:get.status, statusText:get.statusText });
      }
    } catch(e) {
      results.push({ url, error: String(e?.message||e) });
    }
  }
  return results;
}

// Write reports
function toMD(data){
  const lines=[];
  lines.push(`# LegacyCapNY Audit Report`);
  lines.push(`Generated: ${data.meta.generatedAt}`);
  const sections = Object.entries(data.findings);
  for (const [name, arr] of sections) {
    lines.push(`\n## ${name}`);
    if (!arr.length) { lines.push(`- None`); continue; }
    for (const item of arr) {
      lines.push(`- ${JSON.stringify(item)}`);
    }
  }
  return lines.join('\n');
}

(async ()=>{
  const externalBad = await checkExternal();
  for (const b of externalBad) {
    report.findings.brokenLinks.push({ url: b.url, scope:'external', status: b.status ?? 'ERR', note: b.statusText ?? b.error ?? '' });
  }

  // Summaries
  const counts = Object.fromEntries(Object.entries(report.findings).map(([k,v])=>[k,v.length]));
  report.totals = { ...report.totals, ...counts };

  fs.writeFileSync(jsonPath, JSON.stringify(report,null,2));
  fs.writeFileSync(mdPath, toMD(report));

  console.log('Audit complete');
  console.log('JSON:', path.relative(repoRoot, jsonPath));
  console.log('MD  :', path.relative(repoRoot, mdPath));
})().catch(e=>{ console.error(e); process.exit(1); });
