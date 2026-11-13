const {createHash}=require('node:crypto');
const fs=require('node:fs');
const paths=['/','/perfil.html','/proyecto.html','/app.js','/bootstrap.js','/profile.js','/style.css','/experience.css','/profile-page.css','/project-page.css','/accessibility.css','/inventory.js','/inventory-data.js','/inventory-controls.js','/inventory.css','/dialog-focus.js','/readability.js','/frame-loop.js','/physics-world.js','/scene-physics.js','/adventure-state.js','/visit-state.js','/resource-policy.js','/performance-policy.js','/characters.js','/realm-data.js','/realm-architecture.js','/archive-decor.js','/ambient-score.js','/cv-pablo-gutierrez-mata.pdf'];
// Cloudflare añade identificadores por petición; el resto del HTML se conserva.
function stableBytes(path, bytes) {
  if (!['/', '/perfil.html', '/proyecto.html'].includes(path)) return bytes;
  return Buffer.from(bytes.toString('utf8')
    .replace(/(window\.__CF\$cv\$params=\{r:')[a-f0-9]+(',t:')[A-Za-z0-9+/=]+('\})/g, '$1<ray>$2<time>$3')
    .replace(/(\/cdn-cgi\/challenge-platform\/scripts\/jsd\/main\.js\?ray=)[a-f0-9]+/g, '$1<ray>'));
}
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function fingerprint(resources){return hash(JSON.stringify([...resources].sort((a,b)=>a.path.localeCompare(b.path))));}
function verify(actual,expected){if(expected&&actual!==expected)throw Error('El contenido del sitio cambió o no coincide con la referencia. No atribuir los resultados a una versión estable.');}
async function collect(base,fetchResource=fetch){const resources=[],deadline=AbortSignal.timeout(60000);for(const path of paths){const url=new URL(path,base);url.searchParams.set('qa',Date.now().toString());const response=await fetchResource(url,{cache:'no-store',signal:AbortSignal.any([deadline,AbortSignal.timeout(20000)])});if(!response.ok)throw Error(`No se pudo leer ${path}: HTTP ${response.status}`);resources.push({path,sha256:hash(stableBytes(path,Buffer.from(await response.arrayBuffer())))});}return resources;}
async function main(){const phase=process.argv[2];if(!['before','after'].includes(phase))throw Error('Usa before o after');const base=process.env.CYPRESS_BASE_URL||'https://pablo-archivo-de-la-alianza.wintryapricot2.chatgpt.site';const resources=await collect(base),value=fingerprint(resources);fs.mkdirSync('qa-evidence',{recursive:true});fs.writeFileSync(`qa-evidence/site-${phase}.json`,JSON.stringify({base,checkedAt:new Date().toISOString(),qaCommit:process.env.GITHUB_SHA||null,fingerprint:value,resources},null,2)+'\n');verify(value,process.env.EXPECTED_SITE_FINGERPRINT);if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,`fingerprint=${value}\n`);console.log(`Referencia del sitio (${phase}): ${value}`);}
module.exports={fingerprint,verify,collect,paths,stableBytes};
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1});
