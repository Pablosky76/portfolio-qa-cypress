const test=require('node:test'),assert=require('node:assert/strict');
const {fingerprint,verify,collect,paths}=require('./site-fingerprint.cjs');
test('la referencia es independiente del orden y cambia si cambia un recurso',()=>{const a=[{path:'/a',sha256:'1'},{path:'/b',sha256:'2'}];assert.equal(fingerprint(a),fingerprint([...a].reverse()));assert.notEqual(fingerprint(a),fingerprint([{...a[0],sha256:'3'},a[1]]))});
test('una versión distinta falla de forma explícita',()=>{assert.doesNotThrow(()=>verify('abc','abc'));assert.throws(()=>verify('abc','def'),/contenido del sitio cambió/)});
test('un recurso inaccesible invalida la referencia, sin omitirlo',async()=>{await assert.rejects(collect('https://example.invalid',async()=>({ok:false,status:503})),/HTTP 503/)});
test('la lectura incluye todos los recursos declarados y solicita evitar caché',async()=>{let requests=0;const result=await collect('https://example.invalid',async(url,options)=>{requests++;assert.equal(options.cache,'no-store');assert.ok(url.searchParams.has('qa'));return{ok:true,arrayBuffer:async()=>new TextEncoder().encode(url.pathname).buffer}});assert.equal(requests,paths.length);assert.equal(new Set(result.map(r=>r.path)).size,paths.length);assert.ok(result.every(r=>/^[a-f0-9]{64}$/.test(r.sha256)))});

test('la huella HTML ignora solo los identificadores variables de Cloudflare', () => {
  const {stableBytes}=require('./site-fingerprint.cjs');
  const html=(ray,time,title='Portfolio')=>`<h1>${title}</h1><script>window.__CF$cv$params={r:'${ray}',t:'${time}'};var u='/cdn-cgi/challenge-platform/scripts/jsd/main.js?ray=${ray}'</script>`;
  const clean=(value)=>stableBytes('/',Buffer.from(value)).toString();
  assert.equal(clean(html('abc123','AAA=')),clean(html('def456','BBB=')));
  assert.notEqual(clean(html('abc123','AAA=')),clean(html('def456','BBB=','Otro título')));
  assert.equal(stableBytes('/app.js',Buffer.from(html('abc123','AAA='))).toString(),html('abc123','AAA='));
});
