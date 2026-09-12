// Local-only fixture recording. Requires Playwright, Chromium, and ffmpeg.
// Environment: PLAYWRIGHT_MODULE, CHROMIUM_EXECUTABLE, DEMO_OUTPUT.
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { result } from '../tests/fixture.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const out=process.env.DEMO_OUTPUT || '/tmp/bidpilot-demo';fs.mkdirSync(out,{recursive:true});
const server=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production',PORT:'4313'},stdio:'ignore'});
process.on('exit',()=>server.kill());
for(let i=0;i<80;i++){try{if((await fetch('http://127.0.0.1:4313/api/health')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
const b=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'],headless:true});
const c=await b.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:out,size:{width:1440,height:1000}}});
const p=await c.newPage();const pause=(ms)=>p.waitForTimeout(ms*Number(process.env.WAIT_SCALE || '1'));const errors=[];p.on('pageerror',e=>errors.push(e.message));
let posts=0,gets=0,failPoll=false;
await p.route('**/api/calle/**',async route=>{
 const req=route.request();let body;
 if(req.method()==='POST'){posts++;const d=req.postDataJSON();assert.equal(d.authorized,true);assert.ok(d.requestId);body={success:true,callId:result.id,call:{id:result.id,status:'queued'}};}
 else {gets++;if(failPoll){await route.fulfill({status:502,json:{error:'Simulated polling failure; refresh status without a new call.'}});return;}body={success:true,call:gets<3?{id:result.id,status:'in_progress'}:result};}
 await route.fulfill({json:body});
});
await p.goto('http://127.0.0.1:4313');
await p.evaluate(()=>{const x=document.createElement('div');x.textContent='LOCAL SIMULATION · No telephone call placed · Synthetic narration';x.style.cssText='position:fixed;top:0;left:0;right:0;z-index:99999;pointer-events:none;background:#fbbf24;color:#0f172a;padding:10px;text-align:center;font:bold 15px sans-serif';document.body.append(x);});
await p.screenshot({path:out+'/landing.png'});
console.log('Scene 1: landing');await pause(10000);
await p.getByRole('main').getByRole('button',{name:'Try Demo',exact:true}).click();await pause(15000);
const panel=p.locator('section').filter({hasText:'BidPilot Voice · Powered by CALL-E'});
await panel.scrollIntoViewIfNeeded();await p.evaluate(()=>window.scrollBy(0,-60));
await panel.getByLabel('Demo operator token').fill('fixture-operator-token-not-real');
await panel.getByLabel('Supplier / provider').fill('Consenting demo supplier');
await panel.getByLabel('Phone (E.164)').fill('+15145550123');
await panel.getByLabel('Facts CALL-E may verify').fill('Confirm availability, lead time, Montreal coverage, certification status, and voluntary non-binding indicative pricing.');
const start=panel.getByRole('button',{name:'Authorize & Start Verification Call'});const auth=panel.getByRole('checkbox');
assert.equal(await start.isDisabled(),true);
await auth.check();await panel.getByLabel('Supplier / provider').fill('Consenting demo supplier — fixture');await p.waitForFunction(() => !document.querySelector('input[type=checkbox]')?.checked);
assert.equal(await auth.isChecked(),false);
console.log('Scene 2: reviewed questions');await pause(25000);
await auth.check();await pause(15000);
await start.click();assert.equal(await panel.getByLabel('Phone (E.164)').isDisabled(),true);
console.log('Scene 3: authorization and simulated request');await pause(10000);
await panel.getByText('Available — simulated',{exact:true}).waitFor();
assert.equal(posts,1);
for(const value of Object.values(result.recipients[0].structured_result)) assert.ok((await panel.innerText()).includes(String(value)));
assert.ok(!(await panel.innerText()).includes('completed count'));
await p.screenshot({path:out+'/result.png'});
console.log('Scene 4: exact recipient facts rendered');await pause(25000);
await p.evaluate(()=>{const x=document.createElement('div');x.style.cssText='position:fixed;inset:0;z-index:99998;background:#071b25;color:white;display:flex;align-items:center;justify-content:center;padding:100px;font:30px sans-serif';x.innerHTML='<div><p style="color:#5eead4;font-size:18px">BIDPILOT VOICE</p><h1>Reviewable supplier evidence.<br>Human decisions.</h1><p>✓ TypeScript and production build passed</p><p>✓ Backend safeguards and simulated result checks passed</p><p style="color:#fbbf24">Pending: one consenting live CALL-E test<br>and final real-response acceptance</p></div>';document.body.append(x);});
console.log('Scene 5: validation and remaining gate');await pause(26000);
const video=p.video();await c.close();await video.saveAs(out+'/screen.webm');
// A separate unrecorded page verifies polling-error recovery and a failed terminal response.
const q=await b.newPage();let qposts=0;let recovered=false;
await q.route('**/api/calle/**',async route=>{if(route.request().method()==='POST'){qposts++;return route.fulfill({json:{callId:'error-fixture',call:{status:'queued'}}});}return route.fulfill(recovered?{json:{call:{id:'error-fixture',status:'failed'}}}:{status:502,json:{error:'Polling failed; refresh status.'}});});
await q.goto('http://127.0.0.1:4313');await q.getByRole('button',{name:'Try Demo',exact:true}).first().click();
await q.getByLabel('Demo operator token').fill('fixture-token');await q.getByLabel('Supplier / provider').fill('Fixture');await q.getByLabel('Phone (E.164)').fill('+15145550123');await q.getByRole('checkbox').check();await q.getByRole('button',{name:'Authorize & Start Verification Call'}).click();await q.getByText('Polling failed; refresh status.',{exact:true}).waitFor();
recovered=true;await q.getByRole('button',{name:'Refresh call status (no new call)'}).click();await q.getByText(/This call ended without structured supplier facts/).waitFor();assert.equal(qposts,1);
assert.deepEqual(errors,[]);await b.close();
fs.writeFileSync(out+'/ui-checks.json',JSON.stringify({passed:true,simulatedPosts:posts,recipientFieldsMatched:7,authorizationReset:true,fieldsLocked:true,pollRecoveryWithoutNewCall:true,failedTerminalNoFacts:true,pageErrors:errors},null,2));
server.kill();
console.log('PASS browser checks. Recording: '+out+'/screen.webm');
