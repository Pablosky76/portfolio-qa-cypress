const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk('cypress/e2e').filter(p=>p.endsWith('.cy.js'));
const ids=p=>[...fs.readFileSync(p,'utf8').matchAll(/\bit\('([^ ]+) ·/g)].map(m=>m[1]);
const all=files.flatMap(ids);assert.equal(all.length,128);assert.equal(new Set(all).size,128);
const scripts=require('../package.json').scripts;
const specs=name=>scripts[name].match(/--spec '([^']+)'/)[1].split(',');
const smoke=specs('test:smoke');assert.equal(smoke.flatMap(ids).length,8);
const tandas=['test:tanda1','test:tanda2','test:tanda3'].flatMap(specs);
assert.deepEqual([...tandas].sort(),[...files].sort(),'Tandas must select each spec exactly once');
for(const [name,command]of Object.entries(scripts)){if(!command.includes('--spec'))continue;for(const p of specs(name)){if(p.includes('*'))continue;assert.ok(files.includes(p),`${name}: missing ${p}`);}}
console.log('128 unique cases; smoke = 8; all specs covered once by the three tandas.');
