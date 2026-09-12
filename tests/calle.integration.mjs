import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
const token = 'local-test-operator-token-only-0001';
let creations = 0;
import { result } from './fixture.mjs';

const upstream = http.createServer(async (req,res) => {
 res.setHeader('Content-Type','application/json');
 if(req.method==='POST') {
  creations++;
  let body=''; for await (const part of req) body+=part;
  const payload=JSON.parse(body);
  assert.equal(payload.recipients.length,1);
  assert.match(payload.task,/identify yourself as an AI/);
  assert.match(payload.task,/Do not place orders/);
  assert.match(req.headers['idempotency-key'],/^bidpilot_/);
  await new Promise(r=>setTimeout(r,100));
  res.end(JSON.stringify({id:result.id,status:'queued'}));
 } else res.end(JSON.stringify(result));
});
await new Promise(r=>upstream.listen(4311,'127.0.0.1',r));
const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production',PORT:'4312',CALLE_API_KEY:'fixture-key-not-real',CALLE_OPERATOR_TOKEN:token,CALLE_ALLOWED_PHONES:'+15145550123',CALLE_BASE_URL:'http://127.0.0.1:4311'},stdio:'pipe'});
let logs='';child.stderr.on('data',d=>logs+=d);
try {
 for(let i=0;i<80;i++){try{if((await fetch('http://127.0.0.1:4312/api/health')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 const url='http://127.0.0.1:4312/api/calle/verification';
 const body={requestId:randomUUID(),supplierName:'Consenting fixture supplier',phone:'+15145550123',region:'CA',questions:'Confirm availability and lead time.',authorized:true};
 const post=(b,t=token)=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-BidPilot-Token':t},body:JSON.stringify(b)});
 assert.equal((await post(body,'')).status,401);
 assert.equal((await post({...body,authorized:false})).status,400);
 assert.equal((await post({...body,questions:{bad:1}})).status,400);
 assert.equal((await post({...body,phone:'+15145550124'})).status,403);
 assert.equal(creations,0);
 const pair=await Promise.all([post(body),post(body)]);
 assert.deepEqual(pair.map(r=>r.status),[202,202]);assert.equal(creations,1);
 assert.equal((await post({...body,questions:'Changed'})).status,409);
 assert.equal((await post({...body,requestId:randomUUID()})).status,409);
 const response=await fetch(url+'/'+result.id,{headers:{'X-BidPilot-Token':token}});
 assert.deepEqual((await response.json()).call,result);
 assert.equal((await fetch(url+'/unowned',{headers:{'X-BidPilot-Token':token}})).status,404);
 console.log('PASS: authorization, input validation, allowlist, concurrent deduplication, conflicting retry, one-call budget, result round trip, unknown-call isolation. Provider POSTs: '+creations+' (simulated only).');
} finally {child.kill();upstream.close();}
